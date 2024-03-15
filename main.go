package main

import (
	"flag"
	"fmt"
	"os"
	"strings"

	"github.com/pkg/errors"
	"github.com/shirou/gopsutil/v3/process"
)

var (
	userModelId string
	zombieOnly  bool
)

func killElectron() error {
	processList, err := process.Processes()
	if err != nil {
		return errors.Wrap(err, "Error getting process list")
	}

	for _, p := range processList {
		name, err := p.Name()
		if err != nil {
			continue
		}

		cmdLine, err := p.Cmdline()
		if err != nil {
			continue
		}

		if (userModelId != "" && strings.Contains(cmdLine, fmt.Sprintf("--app-user-model-id=%s", userModelId))) || (userModelId == "" && name == "electron" || name == "electron.exe") {
			pp, err := p.Parent()
			if zombieOnly {
				if err != nil {
					_ = p.Terminate()
				}
			} else {
				_ = p.Terminate()
				if err == nil {
					_ = pp.Terminate()
				}
			}
		}

	}

	return nil
}

func main() {
	flag.StringVar(&userModelId, "user-model-id", "", "electron app user model id")
	flag.BoolVar(&zombieOnly, "zombie-only", false, "kill only zombie processes")

	flag.Parse()

	if userModelId == "" && !zombieOnly {
		fmt.Fprintf(os.Stderr, "zombie-only is required when user-model-id is empty\n")
		os.Exit(1)
	}

	if err := killElectron(); err != nil {
		fmt.Fprint(os.Stderr, err.Error())
		os.Exit(1)
	}
}
