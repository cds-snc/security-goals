package main

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
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
	repo := getEnv("REPO_URL", "")

	cr := CheckResult{
		Origin:      origin,
		Component:   component,
		Release:     release,
		Timestamp:   time.Now().UTC().Format(time.RFC3339),
		Description: description,
		References:  repo,
		Satisfies:   strings.Split(satisfies, ","),
	}

	if hasIssues(repo) {
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

func hasIssues(repo string) bool {

	u, err := url.Parse(repo)

	if err != nil {
		fmt.Println("Error: " + err.Error())
		return false
	}

	url := "https://api.github.com/repos" + u.Path + "/issues?state=all"

	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	client := &http.Client{Transport: tr}
	resp, err := client.Get(url)

	if err != nil {
		return false
	}

	defer resp.Body.Close()
	var results []interface{}

	json.NewDecoder(resp.Body).Decode(&results)
	if len(results) > 0 {
		return true
	}
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
