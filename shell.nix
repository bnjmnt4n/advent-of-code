with import <nixpkgs> {};

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs-14_x
  ];
}
