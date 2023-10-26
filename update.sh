#!/usr/bin/env bash
version="v0.1.0"
# set -o errexit

while getopts ':Vm:sat:p' OPTION; do
case "$OPTION" in
  V )
    echo "$version"
    exit
    ;;
  m )
    COMMIT=true
    msg=$OPTARG;
    ;;
  s )
    STATUS=true
    ;;
  a )
    ADD=true
    ;;
  t )
    git_tag=$OPTARG
    ;;
  p )
    PUSH=true
    ;;
esac;
done


if [[ -n "$git_tag" ]]; then
  sed -i "s/\(image:.*:\).*$/\1${git_tag}/" ./docker-compose.yaml
fi
if [[ -n "$ADD" ]]; then
  git add .
fi
if [[ -n "$COMMIT" ]]; then
  git commit -am "${msg}"
fi
if [[ -n "$git_tag" ]]; then
  git tag $git_tag
fi
if [[ -n "$PUSH" ]]; then
  git push origin HEAD --tags
fi
if [[ -n "$STATUS" ]]; then
  git status
fi