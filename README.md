# 4RL

## Setup

### Install

```bash
pnpm i
```

### Supabase

Add config file
`supabase/config.example.toml` -> `supabase/config.toml`

Note I kept this in gitignore because Supabase won't translate env variables for Twilio besides the auth token. [See details](https://github.com/supabase/supabase/issues/19814#issuecomment-1876865411)

In this file, make sure to configure Twilio

```toml
[auth.sms.twilio]
enabled = true
account_sid = "<SID>"
message_service_sid = "<SID>"
# DO NOT commit your Twilio auth token to git. Use environment variable substitution instead:
auth_token = "env(SMS_TWILIO_AUTH_TOKEN)"
```

Setup Supabase Environment Variables

Run `pnpm sb:start` to get some keys

```text
NEXT_PUBLIC_DOMAIN=your-domain
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SMS_TWILIO_AUTH_TOKEN=<TOKEN>

DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

Stop supabase with `pnpm sb:stop`

## Testing

Start supabase local

```bash
pnpm sb:start
```

Run NextJS

```bash
pnpm dev
```

To Login for dev, use a otp test number (defined in `config.toml`). e.g.

```text
# Use pre-defined map of phone number to OTP for testing.
[auth.sms.test_otp]
16019839224 = "123456"
```

## Deployment

1. Push migration to Supabase `supabase db push`
2. Add questions to _questionnaire_ table
3. Turn on Realtime in Supabase for the match table
4. Add environment variables to Vercel with production keys
