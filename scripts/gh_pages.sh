#!/bin/bash

set -x

koth_page=$(pwd)/website/index.html
subs_page=$(pwd)/website/subs.html

pages=($koth_page $subs_page)

for page in "${pages[@]}"; do
    echo $page;
    if [[ -e $page ]]; then
        sed -e "s/src=\"\/static/src=\".\/static/" -e "s/href=\"\/static/href=\".\/static/" $page > $page
    fi
done