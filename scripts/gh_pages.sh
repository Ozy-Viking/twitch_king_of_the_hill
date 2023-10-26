#!/bin/bash

set -x

pages[0]=$(pwd)/website/index.html
pages[1]=$(pwd)/website/subs.html
pages[2]=$(pwd)/website/counter.html
pages[3]=$(pwd)/website/testing.html

for page in "${pages[@]}"; do
    echo $page;
    if [[ -e $page ]]; then
        sed -e "s/src=\"\/static/src=\".\/static/" -e "s/href=\"\/static/href=\".\/static/" $page | tee $page.tmp
        mv -f ${page}.tmp ${page}
    fi
done
