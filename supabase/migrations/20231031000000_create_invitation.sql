create table
  public.user_invites (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    role bigint not null,
    email character varying not null,
    constraint user_invites_pkey primary key (id),
    constraint user_invites_role_fkey foreign key (role) references roles (id)
  );

INSERT INTO public.roles(id, name) VALUES
  (7, 'JUDGE');
  