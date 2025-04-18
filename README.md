# Telegram Mini App Demo

This is a demo Telegram Mini App built with React and Vite.

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

## Deployment

This app is configured to deploy automatically to GitHub Pages. The deployment process is handled by GitHub Actions.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The built files will be in the `dist` directory.

### GitHub Pages URL

Once deployed, your app will be available at:
`https://<your-github-username>.github.io/tma-demo/`

## Telegram Mini App Setup

1. Create a bot with [@BotFather](https://t.me/BotFather)
2. Use the `/newapp` command to create a new Mini App
3. Set the Mini App URL to your GitHub Pages URL
4. Configure the bot's menu button to open your Mini App

## Security Note

For production use, make sure to:
1. Remove the mock Telegram implementation
2. Implement proper validation of Telegram's initData
3. Use the official Telegram WebApp API
