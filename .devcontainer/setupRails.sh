#!/bin/bash
set -euo pipefail
shopt -s inherit_errexit

bin/setup || {
    echo -e "\n\n🚨 Error: bin/setup failed to set up the dev environment!
You'll need to review the error and run bin/setup again after fixing the problem."
}
