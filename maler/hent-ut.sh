#!/usr/bin/env bash

# Dette er et skript for å hente ut det som er i <article>-elementet i et
# HTML-dokument. Sammen med './maler/sett-inn.sh', er dette skriptet tiltenkt
# tilfellet hvor vi ønsker å endre på webdesignet.

error() {
  echo "$1" 1>&2
  exit 1
}

if ! which xmllint 2>/dev/null 1>/dev/null; then
  error "Fant ikke xmllint i PATH"
fi

if ! [ -f "$1" ]; then
  error "$1 ser ikke ut til å eksistere."
fi

# xmllint ser ut til å anta Latin-1 ellers
utf8input="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n$(cat $1)"

echo "$utf8input" | xmllint --html --xpath "//article/child::*" - 2>/dev/null \
  || error "Feil ved forsøk på å hente ut innhold." 

