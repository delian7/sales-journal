# Sales Journal Frontend

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). This relies on the [sales_journal_aggregator_api](https://github.com/delian7/sales_journal_aggregator_api).

## Getting Started
***Prior to running this, make sure to follow the readme on the [sales_journal_aggregator_api](https://github.com/delian7/sales_journal_aggregator_api)***

1. Start the Rails development server:
    ```sh
      rails s
    ```

2. Install the dependencies:
    ```sh
      npm install
    ```

3. Run the development server:
    ```sh
    npm run dev
    ```

## Features
- **Authentication**: The frontend uses localStorage to store the client_id, access_token, and uid needed for authentication. In a production system, Next.js would be leveraged to not expose these to the client for better security.
- **Month Selection**: A view for choosing a month instead of displaying all months.
- **API Integration**: The frontend communicates with the backend API endpoint /api/v1/journal_entries to fetch journal entries.
- **Loading Spinner**: A Tailwind CSS spinner is displayed while data is being loaded.
