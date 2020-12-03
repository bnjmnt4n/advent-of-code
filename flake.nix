{
  inputs = {
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }:
    utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages."${system}";
      in rec {
        devShell = pkgs.mkShell {
          nativeBuildInputs = with pkgs; [
            nodejs-14_x
            python3
          ];
        };
      });
}
