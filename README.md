<div align="left" style="position: relative;">
<img src="https://github.com/jthet/token-tickets/blob/main/public/assets/tokenTicketsLogo-inverted.png?raw=true" align="right" width="8%" style="margin: 20px 20ox 20px 20px;">
<h1>Token Tickets</h1>
<p align="left">
	<em>Token Tickets: A Web3 Ticketing Platform</em>
</p>
<p align="left">
	<img src="https://img.shields.io/github/license/jthet/token-tickets?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/jthet/token-tickets?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/jthet/token-tickets?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/jthet/token-tickets?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="left"><!-- default option, no dependency badges. -->
</p>
<p align="left">
	<!-- default option, no dependency badges. -->
</p>
</div>
<br clear="right">

##  Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [ Getting Started](#getting-started)
6. [ Contributing](#contributing)
7. [ License](#license)
8. [ Acknowledgments](#acknowledgments)

---

##  Overview

Token Tickets is a decentralized event ticketing platform that leverages Hedera’s Hashgraph Token Service to issue tickets as NFTs. These NFTs are transferable and provide transparent and trustless ticket authentication and ownership, reducing the risk of counterfeit tickets, lowering ticketing fees, resolving transactions quickly.

Learn more about it at the [About Page](https://tokentickets.tech/about), or check it out at the [https://tokentickets.tech](https://tokentickets.tech) website.


---

## Tech Stack

| Category          | Tools Used                                   |
|-------------------|----------------------------------------------|
| **Frontend**      | React.js, Redux, TypeScript, JavaScript     |
| **Backend**       | Node.js, Express.js                         |
| **Blockchain**    | Hedera Hashgraph (`@hashgraph/sdk`, HashPack) |
| **Database**      | MongoDB                                     |
| **Styling**       | CSS, `@mui/material`, `@emotion/react`      |
| **Testing**       | Jest, React Testing Library                 |
| **Development**   | npm, ESLint, Prettier, Git                  |
| **DevOps**        | Nginx, PM2, SSL                             |

---


---

##  Project Structure

```sh
└── token-tickets/
    ├── LICENSE
    ├── README.md
    ├── backend
    │   ├── config
    │   ├── dev
    │   ├── middleware
    │   ├── models
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── routes
    │   └── server.js
    ├── config
    │   ├── .eslintignore
    │   ├── .eslintrc.json
    │   ├── .prettierignore
    │   └── .prettierrc
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── assets
    │   └── index.html
    ├── slides
    │   └── token-tickets-overview.pdf
    ├── src
    │   ├── App.jsx
    │   ├── assets
    │   ├── components
    │   ├── index.js
    │   ├── pages
    │   ├── services
    │   ├── store
    │   ├── styles
    │   └── tests
    └── webpack.config.js
```


###  Project Index
<details open>
	<summary><b><code>TOKEN-TICKETS/</code></b></summary>
	<details> <!-- src Submodule -->
		<summary><b>src</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/App.jsx'>App.jsx</a></b></td>
				<td>- App.jsx serves as the central routing component in the React application, orchestrating navigation between different pages such as Home, About, Get Started, Marketplace, Organizers, and Buy<br>- It integrates these components within a styled layout, facilitated by a navigation bar, ensuring a cohesive user interface across the web application.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/index.js'>index.js</a></b></td>
				<td>- Serves as the entry point for the web application, initializing the React application with global styles, Redux for state management, and React Router for navigation<br>- It integrates the HashConnectClient for wallet connectivity, setting up the application structure within a React.StrictMode context for highlighting potential problems in an application.</td>
			</tr>
			</table>
			<details>
				<summary><b>styles</b></summary>
					- CSS files
			</details>
			<details>
				<summary><b>components</b></summary>
				Reusable .tsx/.jsx components 
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/components/UserTickets.tsx'>UserTickets.tsx</a></b></td>
						<td>- UserTickets serves as a React functional component within the application, primarily responsible for displaying user-specific ticket information in a designated UI section<br>- It enhances user interaction by presenting a straightforward, readable format of ticket data, contributing to the overall user experience in managing their tickets effectively.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/components/MintTokenCard.tsx'>MintTokenCard.tsx</a></b></td>
						<td>- MintTokenCard facilitates the creation of NFTs by allowing users to mint tokens associated with event tickets<br>- It integrates with a blockchain via the Hashgraph SDK, managing token metadata and transaction processes<br>- Users can specify metadata URLs, set prices in HBAR, and handle transaction fees, all within a user-friendly interface that interacts with external APIs for data retrieval and transaction execution.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/components/HeroSection.jsx'>HeroSection.jsx</a></b></td>
						<td>- HeroSection serves as the primary visual component for user engagement on the homepage, featuring a dynamic display of various event types and navigation buttons to guide users to further information or the marketplace<br>- It enhances user interaction by periodically updating displayed words and provides direct access to additional site resources.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/components/CreateTokenFormCard.tsx'>CreateTokenFormCard.tsx</a></b></td>
						<td>- CreateTokenFormCard serves as a user interface component within a larger blockchain application, enabling users to create digital tokens<br>- It facilitates the collection of token attributes through form inputs, executes the creation transaction via blockchain, and logs the transaction details to a backend system, enhancing traceability and management of token events.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/components/Button.jsx'>Button.jsx</a></b></td>
						<td>- Button.jsx defines a reusable Button component within the React framework, utilizing PropTypes for prop validation<br>- It supports customization through 'variant' and 'label' props, and an optional 'onClick' handler<br>- The component adapts its styling based on the 'variant' prop, enhancing the UI consistency across the application.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/components/ViewOrganizerEventsCard.tsx'>ViewOrganizerEventsCard.tsx</a></b></td>
						<td>- ViewOrganizerEventsCard.tsx is a React component that displays a list of events organized by a connected user<br>- It fetches event data from a backend service using the organizer's account ID, allows users to toggle details of each event, and provides links to view event details on an external site.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/components/TransactionModal.tsx'>TransactionModal.tsx</a></b></td>
						<td>- TransactionModal serves as a user interface component within the application, providing a modal overlay that displays detailed information about specific events<br>- It enables users to either close the modal or navigate to a purchasing page for event tickets, leveraging navigation with event data for transaction processes.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/components/AllEvents.tsx'>AllEvents.tsx</a></b></td>
						<td>- AllEvents serves as a dynamic component within the application, managing the display and interaction with a list of event data<br>- It handles user interactions such as selecting events to view more details in a modal and expanding the number of events displayed<br>- It also provides feedback during data loading and error states, enhancing user experience.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/components/FeatureCard.jsx'>FeatureCard.jsx</a></b></td>
						<td>- FeatureCard serves as a reusable visual component within the application, designed to display distinct features using icons, titles, and descriptions<br>- It enhances user interface consistency and modularity by encapsulating the presentation logic for feature representation, adhering to specified prop types to ensure data integrity across the platform.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/components/Navbar.tsx'>Navbar.tsx</a></b></td>
						<td>- Navbar.tsx serves as the interactive header component across the application, facilitating user navigation through links and managing wallet connections<br>- It integrates with Redux for state management and HashConnect for wallet operations, enhancing user interaction by displaying connection status and providing direct access to account details or wallet connectivity.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/components/InfoSection.jsx'>InfoSection.jsx</a></b></td>
						<td>- InfoSection.jsx defines a visual component within the application that presents key information about Token Tickets, a secure NFT-based event ticketing platform<br>- It features a section with promotional text and graphics, emphasizing the platform's use of Hedera's consensus network for enhanced security in the Web3 era.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/components/FeaturesSection.jsx'>FeaturesSection.jsx</a></b></td>
						<td>- FeaturesSection serves as a pivotal component within the application, showcasing the core advantages of using Token Tickets through a visually engaging interface<br>- It organizes and displays feature cards that highlight aspects like global access, security, speed, transparency, fraud prevention, and seamless ticket transfers, enhancing user understanding and engagement with the service.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>pages</b></summary>
				Pages for the website.
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/pages/Organizers.tsx'>Organizers.tsx</a></b></td>
						<td>- Organizers.tsx serves as a dynamic interface for event organizers to manage event tokens within a marketplace environment<br>- It allows users to create, mint, and view NFT tickets for events, featuring interactive options that trigger different functionalities based on user interaction, enhancing the overall user experience in managing event-specific tokens.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/pages/GetStarted.jsx'>GetStarted.jsx</a></b></td>
						<td>- GetStarted.jsx serves as the introductory interface for users in the Token Tickets application, providing a welcoming page that outlines the initial steps and general information needed to begin using the service<br>- It features a structured layout with a hero section and additional content areas for future detailed guidance.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/pages/Marketplace.tsx'>Marketplace.tsx</a></b></td>
						<td>- Marketplace.tsx serves as a dynamic interface within the application, allowing users to browse and manage event tickets<br>- It integrates components for displaying all events and user-specific tickets, handling state changes, and navigating to different parts of the application<br>- The page also includes error handling and loading states to enhance user interaction.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/pages/About.jsx'>About.jsx</a></b></td>
						<td>- About.jsx serves as the informational hub for the Token Tickets platform, detailing its mission, unique features, and the benefits of using blockchain for ticketing<br>- It provides an overview of the service, encourages user engagement through a call-to-action button, and links to external resources like GitHub and Hedera for further exploration.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/pages/Buy.tsx'>Buy.tsx</a></b></td>
						<td>- Buy.tsx serves as the interface for purchasing tickets within the application<br>- It fetches event details and available tickets from the backend, displays them, and handles the ticket purchasing process<br>- Users can view event information, select tickets, and complete transactions securely, leveraging connected account credentials and transaction management functions.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/pages/Home.jsx'>Home.jsx</a></b></td>
						<td>- Home.jsx serves as the main landing page within the application's architecture, orchestrating the user interface by integrating the HeroSection, InfoSection, and FeaturesSection components<br>- It structures the presentation of introductory, informational, and feature-related content, enhancing user engagement and providing a cohesive overview of the application's capabilities.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>store</b></summary>
				Manages global application state
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/store/index.ts'>index.ts</a></b></td>
						<td>- Establishes a Redux store for managing application state related to HashConnect integration, including connection status, account IDs, and pairing strings<br>- It utilizes Redux Toolkit to create a slice with actions for updating these states, ensuring efficient state management and reactivity across the application.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>services</b></summary>
				API calls and app logic
				<blockquote>
					<details>
						<summary><b>wallet</b></summary>
						API calls when working with hashconnect
						<blockquote>
							<details>
								<summary><b>wallet</b></summary>
								API functions to hashconnect
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/wallet/wallet/hashconnect-client.tsx'>hashconnect-client.tsx</a></b></td>
										<td>- HashConnectClient in the wallet service module manages the synchronization of connected account IDs with the application state using Redux<br>- It handles updates on account connections, disconnections, and status changes by dispatching relevant actions to store the current state of account connectivity and pairing information within the broader application architecture.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/wallet/wallet/hashconnect.ts'>hashconnect.ts</a></b></td>
										<td>- Establishes connectivity and interaction capabilities with blockchain networks via the HashConnect library, specifically for the "Token Tickets" decentralized application<br>- It handles initialization, account connection verification, and facilitates signing and executing transactions, as well as signing messages, ensuring secure and verified operations within the testnet environment.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>tokens</b></summary>
								API functions with hashconnect to use Hedera Token Service 
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/wallet/tokens/buyToken.ts'>buyToken.ts</a></b></td>
										<td>- Handles the process of purchasing NFT-based tickets by associating a buyer's account with the token and executing a secure transfer<br>- It manages the transaction details, including token and account validations, and facilitates the financial exchange between the buyer and seller, ensuring the correct transfer of ownership and funds.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/wallet/tokens/createToken.ts'>createToken.ts</a></b></td>
										<td>- Handles the creation of new tokens on the Hedera network by facilitating transactions from a specified account<br>- It sets up token characteristics such as name, symbol, and memo, and configures the token type, supply details, and treasury information<br>- Errors are managed and transaction results are logged for further processing.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/wallet/tokens/nftAllowance.ts'>nftAllowance.ts</a></b></td>
										<td>- NFT allowance management within the wallet services is streamlined through `nftAllowanceFcn`, which facilitates the approval process for all serials of a specific NFT collection<br>- It handles the transaction from approval to execution, ensuring secure interactions between the owner, spender, and the blockchain network, leveraging environmental configurations for account management.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>local</b></summary>
						<blockquote>
							<details>
								<summary><b>config</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/local/config/dotenv.js'>dotenv.js</a></b></td>
										<td>- Loads environment variables and configures default settings for account identification and authentication within the application<br>- Specifically, it initializes environment handling with dotenv, and sets up default account ID and private key from environment variables, facilitating secure and configurable integration across the service's operational environment.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>account</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/local/account/verifyAccount.js'>verifyAccount.js</a></b></td>
										<td>- VerifyAccount.js serves as a security module within the codebase, ensuring the integrity of user credentials by validating that a provided private key corresponds to a specified account ID using Hedera Hashgraph's SDK<br>- It performs checks to confirm the match, throwing an error if validation fails, thereby enhancing the application's security measures against unauthorized access.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/local/account/getBalance.js'>getBalance.js</a></b></td>
										<td>- `getBalance.js` within the `src/services/local/account` directory facilitates the retrieval of account balances from a blockchain network using the Hashgraph SDK<br>- It supports fetching both the standard currency and NFT balances by interacting with the network client, ensuring required parameters are present before proceeding with queries and handling the closure of client connections post-query.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/local/account/createAccount.js'>createAccount.js</a></b></td>
										<td>- CreateAccount.js is a module within the account management service responsible for generating new blockchain accounts<br>- It automates the creation of a unique account with a private-public key pair and initializes it with a balance<br>- This functionality is crucial for onboarding new users into the system, enabling secure transactions and interactions within the blockchain network.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/local/account/getClient.js'>getClient.js</a></b></td>
										<td>- getClient.js establishes a connection to the Hedera Hashgraph network by configuring a client with user-specific or default credentials<br>- It supports both mainnet and testnet environments and ensures the operator's credentials are valid before setting them<br>- This module is crucial for interacting with the blockchain, performing transactions, and querying the network securely.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>utils</b></summary>
								<blockquote>
									<details>
										<summary><b>transactions</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/local/utils/transactions/logger.js'>logger.js</a></b></td>
												<td>- Logger.js in the src/services/local/utils/transactions directory configures a logging system using the Winston library to record transaction details at various verbosity levels<br>- It supports console and file outputs, enabling detailed tracking and analysis of transaction activities, statuses, and associated metrics within the application's architecture.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>tokens</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/local/tokens/createNFT.js'>createNFT.js</a></b></td>
										<td>- CreateNFT.js facilitates the creation of non-fungible tokens (NFTs) on the Hedera Hashgraph network<br>- It ensures necessary parameters like token name and symbol are provided, verifies the treasury account, and configures the NFT with attributes such as supply type and maximum supply<br>- Successful execution returns the new token's ID and supply key.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/local/tokens/transferNFT.js'>transferNFT.js</a></b></td>
										<td>- AssociateToken, located within the local tokens service of the codebase, facilitates the association of non-fungible tokens (NFTs) with user accounts<br>- It handles the transaction process, ensuring the NFT is linked to the specified account by executing and obtaining transaction receipts through the Hashgraph SDK<br>- This function is crucial for managing NFT ownership within the application.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/local/tokens/associateToken.js'>associateToken.js</a></b></td>
										<td>- AssociateToken.js enables the association of non-fungible tokens (NFTs) with user accounts within the project's blockchain framework<br>- It handles the transaction process, including setting account and token identifiers, executing the transaction, and confirming its success, thereby linking specific NFTs to designated accounts securely and efficiently.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/local/tokens/mintNFT.js'>mintNFT.js</a></b></td>
										<td>- MintNFT.js facilitates the creation of new non-fungible tokens (NFTs) on the Hedera blockchain by batching up to 10 NFTs per transaction<br>- It ensures the integrity of content identifiers from IPFS, handles transaction signing with a supply key, and manages the submission and receipt of the transaction to confirm minting success.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>transactions</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/local/transactions/getTransactionStream.js'>getTransactionStream.js</a></b></td>
										<td>- Manages the continuous polling of transaction data at specified intervals from a local service, focusing on successful crypto transfers<br>- The module updates tracking timestamps with each poll to ensure the latest transaction data is retrieved and processed, optimizing for efficiency and relevance in data handling within the system's architecture.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/local/transactions/getTransactions.js'>getTransactions.js</a></b></td>
										<td>- GetTransactions.js facilitates the retrieval of transaction data from Hedera mirror nodes, supporting both test and main networks<br>- It dynamically constructs queries based on parameters like transaction type and timestamp, handling up to 100 transactions per request<br>- The function also logs each transaction, enhancing traceability and debugging.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>api</b></summary>
						Internal api calls with the token tickets backend
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/jthet/token-tickets/blob/master/src/services/api/eventsService.ts'>eventsService.ts</a></b></td>
								<td>- Manages interactions with the backend API to retrieve event-related data within the application<br>- It defines an EventData interface and provides functions to fetch unique events and specific events by tokenId, utilizing environmental configurations for API endpoints and security<br>- These functions facilitate data retrieval for event management features.</td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- backend Submodule -->
		<summary><b>backend</b></summary>
		Token Tickets backend. Manages MongoDB database.
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/jthet/token-tickets/blob/master/backend/server.js'>server.js</a></b></td>
				<td>- Backend/server.js establishes the server infrastructure for the TokenTickets platform, configuring middleware, API routes, and database connections<br>- It handles CORS settings, API key validation, and route definitions for events and tickets, ensuring secure and efficient data handling<br>- Additionally, it sets up HTTPS for production with SSL certificates and provides error management across the application.</td>
			</tr>
			</table>
			<details>
				<summary><b>config</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/backend/config/db.js'>db.js</a></b></td>
						<td>- ConnectDB establishes a connection to MongoDB using the Mongoose library, handling both successful connections and errors<br>- It is crucial for the backend's ability to interact with the database, ensuring data storage and retrieval operations across the application<br>- This module is essential for the overall functionality and stability of the backend services.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>dev</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/backend/dev/routes-testing.js'>routes-testing.js</a></b></td>
						<td>- Tests the functionality of event and ticket management routes within the backend service by simulating API requests for creating, retrieving, updating, and deleting events and tickets<br>- It uses environment-specific variables for authentication and connectivity, ensuring the API behaves as expected under various scenarios.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/backend/dev/injecting.js'>injecting.js</a></b></td>
						<td>- Establishes a connection to a MongoDB database and utilizes the Hashgraph SDK to create and manage non-fungible tokens (NFTs) for event ticketing<br>- It handles account creation, token minting, and transaction approvals, while storing event and ticket details in the database, facilitating the integration of blockchain technology with event management systems.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>models</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/backend/models/Event.js'>Event.js</a></b></td>
						<td>- Event.js defines a MongoDB model for event management within the backend of the application, using Mongoose<br>- It structures data related to events, including unique identifiers, token details, supply metrics, transaction statuses, and organizer information<br>- This model is crucial for handling the creation, storage, and retrieval of event-related data, ensuring robust data integrity and accessibility throughout the application.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/backend/models/Ticket.js'>Ticket.js</a></b></td>
						<td>- Defines the data structure for tickets in the system using a MongoDB schema, specifying fields such as token ID, name, symbol, serial number, price, and owner account<br>- It also enforces uniqueness of serial numbers within each token ID to prevent duplicates, ensuring data integrity and facilitating efficient ticket management in the database.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>routes</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/backend/routes/event.js'>event.js</a></b></td>
						<td>- Manages event-related data interactions within a backend system, facilitating operations such as saving new event transactions, retrieving events by various criteria (e.g., token ID, organizer account), updating serial numbers for specific tokens, and aggregating unique event details<br>- This component enhances data management efficiency and user-specific query capabilities.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/backend/routes/ticket.js'>ticket.js</a></b></td>
						<td>- Manages ticket lifecycle in a backend system, facilitating the creation, retrieval, updating, and deletion of ticket records<br>- It supports operations such as creating new tickets, fetching tickets by ID or owner, updating ticket ownership, and removing tickets, ensuring robust management and accessibility of ticket data.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>middleware</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/jthet/token-tickets/blob/master/backend/middleware/apiKeyMiddleware.js'>apiKeyMiddleware.js</a></b></td>
						<td>- ValidateApiKey serves as a middleware component within the backend architecture, ensuring that each API request includes a valid API key<br>- It checks the provided key against an expected value stored in the environment settings, denying access and returning an error if the keys do not match, thereby enhancing the security of the application.</td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---
##  Getting Started

###  Prerequisites

To run token tickets, have an environment that supports these:

- **Programming Language:** JavaScript
- **Package Manager:** Npm


###  Installation

Install token tickets:

**Build from source:**

1. Clone the token-tickets repository:
```sh
❯ git clone https://github.com/jthet/token-tickets
```

2. Navigate to the project directory:
```sh
❯ cd token-tickets
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```

3. Set up environment variables

Create a `.env` file and add the following lines. If you are running the app without the backend database, you can just include the hashconnect project ID for wallet connectivity and functionality. You can get a project ID [here](https://cloud.reown.com). 
```
# React env variables
REACT_APP_HASHCONNECT_PROJECT_ID=Your

# Database
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_API_KEY=example123

```
If you want to run the backend, you must create a `backend/.env` file with the following:

```
MONGODB_URI=mongodb+srv://<user>:<password>@<hostname>
PORT=5000

API_KEY=example123

# # For testing routes and populating database.
# dev user
OPERATOR_ACCOUNT_ID=
OPERATOR_ACCOUNT_PRIVATE_KEY_DER=

# TOKEN_TICKETS_USER
REACT_APP_TOKEN_TICKETS_ACCOUNT_ID=
REACT_APP_TOKEN_TICKETS_PRIVATE_KEY=
REACT_APP_TOKEN_TICKETS_PUBLIC_KEY=

```



###  Usage
Run token-tickets using the following command:


```sh
❯ npm start
```


###  Testing
Run the test suite using the following command:


```sh
❯ npm test
```
---

##  Contributing

- **🐛 [Report Issues](https://github.com/jthet/token-tickets/issues)**: Submit bugs found or log feature requests for the `token-tickets` project.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/jthet/token-tickets
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/jthet/token-tickets/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=jthet/token-tickets">
   </a>
</p>
</details>

---

##  License

This project is protected under the Apache 2.0 License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- Created for Hedera Hello Future 2.0 Hackathon

---
