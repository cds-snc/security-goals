package main

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/google/uuid"
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
	url := getEnv("URL", "")

	cr := CheckResult{
		Origin:      origin,
		Component:   component,
		Release:     release,
		Timestamp:   time.Now().UTC().Format(time.RFC3339),
		Description: description,
		References:  url,
		Satisfies:   strings.Split(satisfies, ","),
	}

	if urlExists(url) {
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

func urlExists(url string) bool {
	timeout := time.Duration(5 * time.Second)
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	client := &http.Client{Transport: tr, Timeout: timeout}
	resp, err := client.Get(url)
	if err != nil {
		fmt.Println("Error: " + err.Error())
		return false
	}
	if resp.StatusCode >= 200 && resp.StatusCode <= 299 {
		fmt.Println("URL: " + url + " exists.")
		return true
	}
	fmt.Println("URL: " + url + " did not return a 200 range code.")
	return false

}

func outputValidationFile(check CheckResult, path string) (string, error) {
	filePath := path + uuid.New().String() + ".json"
	output, _ := json.Marshal(check)
	file, err := os.Create(filePath)
	defer file.Close()
	fmt.Fprintf(file, string(output))
	return filePath, err
}
