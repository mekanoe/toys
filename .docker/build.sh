set -e
OUT=${OUT:-"./dist"}
RWD=

check_safe () {
  if [ `basename $PWD` == '.docker' ]; then
    echo "🔰 This should be ran from repo root, moving up..."
    cd ..
  fi
}

build () {
  echo "♡ Building $1"
  cd ./"$1"
  rm -rf ./dist

  yarn >/dev/null 2>/dev/stdout
  yarn build >/dev/null 2>/dev/stdout

  mv ./dist $RWD/dist/"$1"
  cd $RWD
}

build_index () {
  # do stuff
  echo "⭐️ Index generated"
}

build_all () {
  for dir in $1; do
    cdir=`basename $dir`
    build $cdir
  done
}

clean_dist () {
  rm -rf $RWD/dist
}

main () {
  check_safe
  RWD=$PWD

  cd $RWD
  clean_dist

  dirs=`/bin/ls -1Ad */`

  rm -rf $OUT
  mkdir $OUT

  build_all "$dirs"
  build_index "$dirs"
}

main "$@"
