#!/usr/bin/env bash
version="v0.1.0"
set -o errexit

while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do case $1 in
  -V | --version )
    echo "$version"
    exit
    ;;
  -m | --message )
    shift; git=$1;
    git commit -am "${git}"
    ;;
  -s | --status )
    git status
    ;;
  -a | --all )
    git add .
    ;;
  -t | --tag )
    shift; git_tag=$1
    sed -i "s/\(image:.*:\).*$/\1${git_tag}/" ./docker-compose.yaml
    ;;
esac; shift; done
if [[ "$1" == '--' ]]; then shift; fi

if [[ -n "$git_tag" ]]; then
  echo $git_tag
else


