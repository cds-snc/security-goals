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

	if hasSnyk(repo) {
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

func hasSnyk(repo string) bool {

	u, err := url.Parse(repo)

	if err != nil {
		fmt.Println("Error: " + err.Error())
		return false
	}

	url := "https://api.github.com/repos" + u.Path + "/pulls?state=closed"

	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	client := &http.Client{Transport: tr}
	resp, err := client.Get(url)

	if err != nil {
		fmt.Println("Error: " + err.Error())
		return false
	}

	defer resp.Body.Close()
	var results []interface{}

	json.NewDecoder(resp.Body).Decode(&results)
	if len(results) > 0 {
		first := results[0].(map[string]interface{})
		head := first["head"].(map[string]interface{})
		sha := head["sha"].(string)
		url := "https://api.github.com/repos" + u.Path + "/statuses/" + sha
		r, err := client.Get(url)
		if err != nil {
			fmt.Println("Error: " + err.Error())
			return false
		}
		defer r.Body.Close()
		var checks []interface{}
		json.NewDecoder(r.Body).Decode(&checks)
		if len(checks) > 0 {
			for i := 0; i < len(checks); i++ {
				check := checks[i].(map[string]interface{})
				context := check["context"].(string)
				if strings.Contains(context, "snyk") {
					return true
				}
			}
		}
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
