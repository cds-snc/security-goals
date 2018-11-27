package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/google/uuid"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

// CheckResult struct
type CheckResult struct {
	Origin      string   `json:"origin"`
	Timestamp   string   `json:"timestamp"`
	Satisfies   []string `json:"satisfies"`
	Passed      bool     `json:"passed"`
	Description string   `json:"description"`
	References  string   `json:"references"`
	Component   string   `json:"component"`
	Release     string   `json:"release"`
}

func main() {
	runCheck()
}

func runCheck() (string, error) {
	origin := getEnv("ORIGIN", "Missing origin")
	component := getEnv("COMPONENT", "Missing componet")
	description := getEnv("DESCRIPTION", "Missing description")
	path := getEnv("OUT_PATH", "/checks/")
	satisfies := getEnv("SATISFIES", "")
	release := getEnv("RELEASE", "")
	needle := getEnv("NEEDLE", "")

	cr := CheckResult{
		Origin:      origin,
		Component:   component,
		Release:     release,
		Timestamp:   time.Now().UTC().Format(time.RFC3339),
		Description: description,
		References:  needle,
		Satisfies:   strings.Split(satisfies, ","),
	}

	if roleExists(needle) {
		cr.Passed = true
	} else {
		cr.Passed = false
	}
	return outputValidationFile(cr, path)
}

func getEnv(key, fallback string) string {
	value := os.Getenv(key)
	if len(value) == 0 {
		return fallback
	}
	return value
}

func roleExists(needle string) bool {
	compliant := false

	config, err := rest.InClusterConfig()
	if err != nil {
		panic(err.Error())
	}

	// Create the clientset
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}

	// Get the roles
	roles, err := clientset.RbacV1().ClusterRoles().List(metav1.ListOptions{})
	if err != nil {
		panic(err.Error())
	}

	// Loop over the roles and see if they match the needle
	for i := 0; i < len(roles.Items); i++ {
		name := roles.Items[i].Name
		if name == needle {
			compliant = true
		}
	}
	return compliant
}

func outputValidationFile(check CheckResult, path string) (string, error) {
	filePath := path + uuid.New().String() + ".json"
	output, _ := json.Marshal(check)
	file, err := os.Create(filePath)
	defer file.Close()
	fmt.Fprintf(file, string(output))
	return filePath, err
}
