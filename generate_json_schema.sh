#!/bin/bash

for f in schema/*/schema.ts
do
    echo "converting ts schema: $f, to json schema: ${f%ts}json"
    typescript-json-schema --defaultNumberType integer --required "$f" -o "${f%ts}json" '*';
done

