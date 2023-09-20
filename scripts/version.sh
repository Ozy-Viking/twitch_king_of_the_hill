#!/bin/bash

set -x

pages[0]=$(pwd)/website/index.html
pages[1]=$(pwd)/website/subs.html
pages[2]=$(pwd)/website/counter.html
version=$1

for page in "${pages[@]}"; do
    echo $page;
    if [[ -e $page ]]; then
        sed -e "s/(version_tag)/($version)/" $page | tee $page.tmp
        mv -f ${page}.tmp ${page}
    fi
done
