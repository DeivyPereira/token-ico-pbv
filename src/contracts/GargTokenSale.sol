pragma solidity ^0.5.0;

import "./GargToken.sol";

contract GargTokenSale {
    address payable admin;
    GargToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);

    constructor(GargToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(
            msg.value == _numberOfTokens * tokenPrice,
            "El número de tokens no coincide con el valor"
        );
        require(
            tokenContract.balanceOf(address(this)) >= _numberOfTokens,
            "El contacto no tiene suficientes tokens"
        );
        require(
            tokenContract.transfer(msg.sender, _numberOfTokens),
            "Algún problema con la transferencia de tokens"
        );
        tokensSold += _numberOfTokens;
        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public {
        require(msg.sender == admin, "Solo el administrador puede llamar a esta función");
        require(
            tokenContract.transfer(
                msg.sender,
                tokenContract.balanceOf(address(this))
            ),
            "No se pueden transferir tokens a admin"
        );
        // destroy contract
        selfdestruct(admin);
    }
}
