#!/bin/bash

set -x

koth_page=$(pwd)/website/index.html
subs_page=$(pwd)/website/subs.html
version=$1

pages=($koth_page $subs_page)

for page in "${pages[@]}"; do
    echo $page;
    if [[ -e $page ]]; then
        sed -e "s/(version_tag)/($version)/" $page
    fi
done
