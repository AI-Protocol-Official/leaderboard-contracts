
// Zeppelin helper constants
const {
	ZERO_ADDRESS,
} = require("@openzeppelin/test-helpers/src/constants");

// ERC20 deployment routines to reuse
const {
	ali_erc20_deploy: deploy_ali_erc20,
} = require("../../ali_token/include/deployment_routines");


/**
 * Deploys the Eth Reward System via ERC1967 proxy
 *
 * @param a0 deployer address, required
 * @returns ethRewardSystem instance
 */
async function deploy_eth_reward_system(a0) {
	// deploy implementation
	const RewardSystem = artifacts.require("RewardSystem");
	const impl = await RewardSystem.new({ from: a0 });

	// prepare the proxy initialization call bytes
	const init_data = impl.contract.methods.postConstruct(ZERO_ADDRESS).encodeABI();

	// deploy the ERC1967 proxy
	const ERC1967Proxy = artifacts.require("ERC1967Proxy");
	const proxy = await ERC1967Proxy.new(impl.address, init_data, { from: a0 });

	// cast proxy to the correct ABI
	return await RewardSystem.at(proxy.address);
}

/**
 * Deploys the ERC20 Reward System via ERC1967 proxy
 *
 * @param a0 deployer address, required
 * @param token_address ERC20 token address, required
 * @returns erc20RewardSystem instance
 */
async function deploy_erc20_reward_system(a0, token_address) {
	// deploy implementation
	const RewardSystem = artifacts.require("RewardSystem");
	const impl = await RewardSystem.new({ from: a0 });

	// prepare the proxy initialization call bytes
	const init_data = impl.contract.methods.postConstruct(token_address).encodeABI();

	// deploy the ERC1967 proxy
	const ERC1967Proxy = artifacts.require("ERC1967Proxy");
	const proxy = await ERC1967Proxy.new(impl.address, init_data, { from: a0 });

	// cast proxy to the correct ABI
	return await RewardSystem.at(proxy.address);
}



// export public deployment API
module.exports = {
	deploy_ali_erc20,
	deploy_eth_reward_system,
	deploy_erc20_reward_system,
};
