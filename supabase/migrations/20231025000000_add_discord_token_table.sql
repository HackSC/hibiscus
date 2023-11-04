create table
  public.discord_tokens (
    user_id uuid not null,
    discord_verification_token uuid not null default gen_random_uuid (),
    constraint discord_tokens_pkey primary key (user_id),
    constraint discord_tokens_discord_verification_token_key unique (discord_verification_token)
  );