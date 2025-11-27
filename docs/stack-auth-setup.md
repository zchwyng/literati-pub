# Stack Auth OAuth Provider Setup

## Configure Mainstream OAuth Providers

To add Google, Microsoft, and Apple sign-in (and remove GitHub), configure providers in the Stack Auth dashboard:

### Steps:

1. **Go to Stack Auth Dashboard**: https://app.stack-auth.com
2. **Navigate to your project**: Select the project with ID `1b8a843d-e36c-4b66-a256-3ea0fcc39487`
3. **Go to Auth Methods**: Click on "Auth Methods" in the sidebar
4. **Configure OAuth Providers**:

#### Google Sign-In:
- Click "Add SSO Providers" → Select "Google"
- Create OAuth app in [Google Cloud Console](https://console.cloud.google.com/)
- Add redirect URI: `https://api.stack-auth.com/api/v1/auth/oauth/callback/google`
- Enter Client ID and Client Secret in Stack Auth dashboard

#### Microsoft Sign-In:
- Click "Add SSO Providers" → Select "Microsoft"
- Create app in [Microsoft Entra admin center](https://entra.microsoft.com/)
- Add redirect URI: `https://api.stack-auth.com/api/v1/auth/oauth/callback/microsoft`
- Enter Client ID and Client Secret in Stack Auth dashboard

#### Apple Sign-In:
- Click "Add SSO Providers" → Select "Apple"
- Create app in [Apple Developer Portal](https://developer.apple.com/)
- Add redirect URI: `https://api.stack-auth.com/api/v1/auth/oauth/callback/apple`
- Enter Client ID and Client Secret in Stack Auth dashboard

#### Remove GitHub:
1. In "Auth Methods", find the GitHub provider
2. Click on the GitHub provider card/row
3. Click "Disable" or "Delete" to remove it
4. Confirm the removal

**Important**: After removing GitHub, make sure to save your changes in the Stack Auth dashboard.

### Note:
The GitHub provider is hidden via CSS in `app/globals.css`. Once you configure the other providers in the dashboard, they will automatically appear in the sign-in/sign-up forms.

