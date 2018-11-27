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

func TestOutputValidationFile(t *testing.T) {

	cr := CheckResult{}

	// Writes a validation file
	filename, _ := outputValidationFile(cr, "./")
	_, err := os.Stat(filename)
	os.Remove(filename)
	assert.Equal(t, err, nil, "they should be equal")

	// Returns an error if it cannot write
	// _, err = outputValidationFile(cr, "/")
	// assert.NotEqual(t, err, nil, "they should be be equal")

}

