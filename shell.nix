{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/06278c77b5d162e62df170fec307e83f1812d94b.tar.gz") { } }:

pkgs.mkShell {
  buildInputs = [
    pkgs.which
    pkgs.htop
    pkgs.zlib
    pkgs.nodejs-slim-16_x
    (pkgs.python39.withPackages (ps: [
      ps.flask
      ps.flake8
      ps.black
    ]))
    pkgs.python39Packages.poetry
    pkgs.pre-commit
    pkgs.python39Packages.pre-commit-hooks
    pkgs.yarn
    pkgs.docker
    pkgs.yamllint
  ];
}
