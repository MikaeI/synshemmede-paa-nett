#!/usr/bin/env bash

# Dette er et skript for å sette inn innhold i en mal. Sammen med
# './maler/hent-ut.sh' er dette skriptet tiltenkt tilfellet hvor vi ønsker å
# endre på webdesignet.

error() {
  msg="$1"
  echo "$msg" 1>&2
  exit 1
}

usage() {
  echo "Bruk: sett-inn.sh -t <malfil> <input>"
}

while getopts ":ht:" opt; do
  case $opt in
    h)
      usage
      exit
      ;;
    t)
      templatefile="${OPTARG}"
      ;;
    *)
      echo "[$opt][$OPTARG]"
      usage >&2
      exit 1
      ;;
  esac
done
shift $((OPTIND-1))

if [ -z "$templatefile" ]; then
  templatefile="$(dirname "$0")/sidemal.html"
fi

inputfile="$1"
if ! [ -f "$inputfile" ]; then
  error "$inputfile ser ikke ut til å eksistere"
fi

if ! which xmllint 2>/dev/null 1>/dev/null; then
  error "Fant ikke xmllint i PATH"
fi

if ! [ -f "$templatefile" ]; then
  error "Malfilen $templatefile ser ikke ut til å eksistere"
fi

# xmllint ser ut til å anta Latin-1 ellers
utf8input="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n$(cat $inputfile)"

title="$(echo "$utf8input" | xmllint --html --xpath "//h1/text()" -)" \
  || error "Klarte ikke å hente ut tittelen fra dokumentet"
body="$(echo "$utf8input" | xmllint --html --xpath "//h1/following-sibling::*" -)" \
  || error "Klarte ikke å hente ut innholdet fra dokumentet"

export TITTEL="$title"
export INNHOLD="$body"
envsubst < "$templatefile"\
  || error "Feil ved utfylling av malen"

