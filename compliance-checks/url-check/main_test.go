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

func TestRunCheck(t *testing.T) {
	os.Setenv("OUT_PATH", "./")

	// Creates a validation file if the URL does not exists
	filename, _ := runCheck()
	_, err := os.Stat(filename)
	os.Remove(filename)
	assert.Equal(t, err, nil, "they should be equal")

	// Creates a validation file if the URL exists
	os.Setenv("URL", "http://google.com")
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
	_, err = outputValidationFile(cr, "/boot")
	assert.NotEqual(t, err, nil, "they should not be equal")

}

func TestUrlExists(t *testing.T) {
	// Returns true if the URL exists
	exists := urlExists("http://google.com")
	assert.Equal(t, exists, true, "they should be equal")

	// Returns false if the URL does not exist
	exists = urlExists("http://abcd.efgh.jklm")
	assert.Equal(t, exists, false, "they should be equal")

	// Returns false if the URL is not 200
	exists = urlExists("https://httpbin.org/status/400")
	assert.Equal(t, exists, false, "they should be equal")

	// Returns false if the URL is empty
	exists = urlExists("")
	assert.Equal(t, exists, false, "they should be equal")
}
