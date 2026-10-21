#!/usr/bin/env sh
set -eu

cargo build --release --locked
mkdir -p dylibs/
cp -v target/release/*.* dylibs/
