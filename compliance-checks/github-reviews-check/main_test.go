package main

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetEnv(t *testing.T) {
	// getEnv returns a default variable
	unkown := getEnv("UNKOWN", "unkown")
	assert.Equal(t, "unkown", unkown, "they should be equal")

	// getEnv returns the actuall value
	os.Setenv("KNOWN", "FOO")
	known := getEnv("KNOWN", "known")
	assert.Equal(t, known, "FOO", "they should be equal")
}

func TestHasReviews(t *testing.T) {
	// Returns true if the GitHub Repo has reviewers
	reviews := hasReviews("https://github.com/cds-snc/vac-benefits-directory")
	assert.Equal(t, reviews, true, "they should be equal")

	// Returns false if the GitHub Repo has no reviewers
	reviews = hasReviews("https://github.com/google/go-github")
	assert.Equal(t, reviews, false, "they should be equal")

	// Returns false if no URL is passed
	reviews = hasReviews("")
	assert.Equal(t, reviews, false, "they should be equal")

	// Returns false if a bad URL is passed
	reviews = hasReviews("foo.bar//asd")
	assert.Equal(t, reviews, false, "they should be equal")
}

func TestRunCheck(t *testing.T) {
	os.Setenv("OUT_PATH", "./")

	// Creates a validation file if the Repo has no reviews
	filename, _ := runCheck()
	_, err := os.Stat(filename)
	os.Remove(filename)
	assert.Equal(t, err, nil, "they should be equal")

	// Creates a validation file if the Repo has reviews
	os.Setenv("REPO_URL", "https://github.com/cds-snc/vac-benefits-directory")
	filename, _ = runCheck()
	_, err = os.Stat(filename)
	os.Remove(filename)
	assert.Equal(t, err, nil, "they should be equal")

}

func TestOutputValidationFile(t *testing.T) {

	cr := CheckResult{}

	// Writes a validation file
	filename, _ := outputValidationFile(cr, "./")
	_, err := os.Stat(filename)
	os.Remove(filename)
	assert.Equal(t, err, nil, "they should be equal")

	// Returns an error if it cannot write
	_, err = outputValidationFile(cr, "/")
	assert.NotEqual(t, err, nil, "they should be be equal")

}
