{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/743d7baa31ff74f2e1dbf09a6ea38a7e24aedfc3.tar.gz") { } }:

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
      ps.pytest
    ]))
    pkgs.poetry
    pkgs.pre-commit
    pkgs.python39Packages.pre-commit-hooks
    pkgs.yarn
    pkgs.docker
    pkgs.yamllint
    pkgs.nodePackages.serverless
  ];
}
