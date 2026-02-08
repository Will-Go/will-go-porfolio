SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict Tm39QIV2pX2QwWV9dk1OmfBzldjERGbiFHQGUebBv8ieJdh46avjKh6cWzZPuPQ

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."categories" ("id", "name", "description", "created_at", "modified_at") VALUES
	('a4f6c18b-2db8-4a97-8919-f3119592f5a1', 'Frontend', 'Client-side development', '2026-02-08 18:41:26.443117+00', '2026-02-08 18:41:26.443117+00'),
	('9beb5a83-b481-4d64-95cc-b8b57a96f594', 'Backend', 'Server-side development', '2026-02-08 18:41:26.443117+00', '2026-02-08 18:41:26.443117+00'),
	('9cecaa93-7147-41ee-a26e-b9b3dac4072a', 'Database', 'Data storage and management', '2026-02-08 18:41:26.443117+00', '2026-02-08 18:41:26.443117+00'),
	('a7ef9d28-2d2b-48d9-8657-81a76fd3b0ff', 'Cloud', 'Cloud computing platforms', '2026-02-08 18:41:26.443117+00', '2026-02-08 18:41:26.443117+00'),
	('ef16a9dc-81f5-41eb-a9a8-1bee3e527c2e', 'DevOps', 'Development and operations', '2026-02-08 18:41:26.443117+00', '2026-02-08 18:41:26.443117+00'),
	('689ddd46-a0b7-408e-abf5-4eb6a705e255', 'Tools', 'Development tools and utilities', '2026-02-08 18:41:26.443117+00', '2026-02-08 18:41:26.443117+00'),
	('0836da15-b540-4672-8c78-c07565892d97', 'Programming Languages', 'Core programming languages', '2026-02-08 18:41:26.443117+00', '2026-02-08 18:41:26.443117+00'),
	('2ad5e243-567e-4106-8714-2fde2d8e1913', 'Operating Systems', 'OS knowledge', '2026-02-08 18:41:26.443117+00', '2026-02-08 18:41:26.443117+00'),
	('a0f4922e-658b-4764-b7fc-4d857c0bc898', 'Security', 'Cybersecurity tools and practices', '2026-02-08 18:41:26.443117+00', '2026-02-08 18:41:26.443117+00'),
	('abeedc3e-4bf5-46c9-8aee-bcd7b69ad279', 'Testing', 'Quality assurance and testing', '2026-02-08 18:41:26.443117+00', '2026-02-08 18:41:26.443117+00'),
	('247d79b2-d86a-4556-81d5-310cc89e9aa0', 'Mobile', 'Mobile application development', '2026-02-08 18:41:26.443117+00', '2026-02-08 18:41:26.443117+00'),
	('33f1186b-7e46-4814-b2d2-c58e97a3f1f8', 'AI/ML', 'Artificial Intelligence and Machine Learning', '2026-02-08 18:41:26.443117+00', '2026-02-08 18:41:26.443117+00');


--
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."skills" ("id", "name", "started_at", "created_at", "modified_at") VALUES
	('e5dbc813-7c31-4a94-8887-93c8bb26211a', 'React.js', '2023-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('43f9cfd2-6dc4-4d61-a5ed-20ea10d2ce86', 'Next.js', '2023-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('6a3a3b2c-b420-4798-8504-ba0e5846141e', 'TypeScript', '2024-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('d9fb8ff7-3661-4883-8e64-f24e4637a11e', 'PostgreSQL', '2024-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('08915211-ed65-4e32-bdb9-fd56a15740fe', 'Supabase', '2024-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('0d5f6b8a-8620-432c-b94c-e69573df5f41', 'Firebase', '2024-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('81cc5256-4022-4d8c-8e15-2abad1e9849b', 'Tailwind CSS', '2023-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('3133bb7c-9d00-4c9b-8d74-cf5d51fbb08c', 'Express.js', '2024-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('4924d9e6-d7ba-48dd-abcf-1bd65ea71c53', 'MongoDB', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('ce319056-c6af-4e6a-88a9-8b42ed587b34', 'Git', '2021-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('ab1fefb5-3fc7-4f90-943d-405a0694414a', 'Bootstrap', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('1924aecc-357a-4a6b-9b5e-bc26f5fe8f5b', 'jQuery', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('8a3141e3-e2e4-4a57-bb82-7531157a0231', 'AWS', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('62f6a21b-ceda-40b6-b871-a3d708ed701e', 'Azure', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('3aab11a2-f533-48cf-8ef3-5c8c6f322842', 'GCP (Google Cloud Platform)', '2024-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('2311e6e8-5937-43f3-ada4-fd7f9cfe92ae', 'Docker', '2024-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('ec6dfbc1-ea14-40ed-af7b-a21b763c7d11', 'Command line tools', '2021-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('a695e990-b089-4d3e-bdf7-f58edbf6f8e1', 'Windows', '2021-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('1ce576dc-c477-4e00-86c7-69dd84bb5c61', 'Linux', '2023-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('549e6433-5b68-47ad-8153-19aa89df8baa', 'Python', '2023-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('568f6382-548f-455e-9f27-562d69485e0b', 'JavaScript', '2023-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('a0c02b96-eb49-42d9-acb5-11bba8e7d7de', 'Java', '2024-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('54e77441-2d64-4083-9f76-3df0f530636d', 'C#', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('a6c1be18-9af2-480a-bc40-d08b24f52238', 'PHP', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('d663ee4c-2bba-4135-93b2-a88bd012a942', 'Bash scripting', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('4d503fbb-7c90-4398-b2ce-502775e043b0', 'SQL', '2023-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('582cf4b6-be78-4c9f-aac6-87bd3dd895a2', 'MySQL', '2023-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('315d8b39-0899-4ed2-8051-bc3f368f1747', 'MariaDB', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('dc847633-b980-4ef3-addc-2a6361936fcd', 'Oracle SQL', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('ce271eff-550c-4ac4-a391-ca28e2a8fc25', 'MSSQL', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('bd9bc019-0a87-41b9-8e29-36aa1606a8e8', 'NoSQL', '2024-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('ee6696ae-c45f-48a1-aae7-001dfefb7a8d', 'HTML5', '2021-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('1d9ac8e6-409b-4712-8df0-8f9dd5860312', 'CSS3', '2021-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('5ab6087a-c2fe-469a-9c03-e61e68f180cf', 'Cypress', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('89ee1bf8-e8b5-4d1c-92d1-e82dbef26e44', 'Postman', '2024-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('042007b8-0c0d-4cec-a42f-416a0e6273d8', 'Axios', '2024-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('e16f7292-1b27-47df-9a40-3b51e0ac5616', 'nmap', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('f387003f-82ba-4e32-b0f1-9c89f640320b', 'Metasploit', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('10aff147-062e-4078-8be1-3b43d2c9898a', 'bettercap', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('aa1cb7d0-552e-49e3-b5b0-f5137ab28dc1', 'gobuster', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('de5e1ac9-90e2-45dd-b75a-08b2e794fc28', 'ffuf', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('d6b43311-5397-4868-8695-aae904226f49', 'airmon-ng', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('c966b67d-eab5-4b8c-80d2-9f9019bfaf68', 'Wireshark', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('9ea18f05-08a6-4352-b4f8-20d8f6f2eded', 'Machine Learning', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('1f0ab1ea-557c-4b9a-b896-92a191d888d3', 'AI', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('223febb1-ad9e-4dc7-857c-54413263b56c', 'Xamarin Forms', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00'),
	('3e090bfb-7daa-4544-a027-4d9e9893ffe4', 'PL-SQL', '2025-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00', '2026-02-08 18:41:26.491712+00');


--
-- Data for Name: skill_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."skill_categories" ("skill_id", "category_id", "created_at") VALUES
	('e5dbc813-7c31-4a94-8887-93c8bb26211a', 'a4f6c18b-2db8-4a97-8919-f3119592f5a1', '2026-02-08 18:41:26.563893+00'),
	('43f9cfd2-6dc4-4d61-a5ed-20ea10d2ce86', 'a4f6c18b-2db8-4a97-8919-f3119592f5a1', '2026-02-08 18:41:26.563893+00'),
	('6a3a3b2c-b420-4798-8504-ba0e5846141e', '0836da15-b540-4672-8c78-c07565892d97', '2026-02-08 18:41:26.563893+00'),
	('d9fb8ff7-3661-4883-8e64-f24e4637a11e', '9cecaa93-7147-41ee-a26e-b9b3dac4072a', '2026-02-08 18:41:26.563893+00'),
	('08915211-ed65-4e32-bdb9-fd56a15740fe', '9beb5a83-b481-4d64-95cc-b8b57a96f594', '2026-02-08 18:41:26.563893+00'),
	('0d5f6b8a-8620-432c-b94c-e69573df5f41', '9beb5a83-b481-4d64-95cc-b8b57a96f594', '2026-02-08 18:41:26.563893+00'),
	('81cc5256-4022-4d8c-8e15-2abad1e9849b', 'a4f6c18b-2db8-4a97-8919-f3119592f5a1', '2026-02-08 18:41:26.563893+00'),
	('3133bb7c-9d00-4c9b-8d74-cf5d51fbb08c', '9beb5a83-b481-4d64-95cc-b8b57a96f594', '2026-02-08 18:41:26.563893+00'),
	('4924d9e6-d7ba-48dd-abcf-1bd65ea71c53', '9cecaa93-7147-41ee-a26e-b9b3dac4072a', '2026-02-08 18:41:26.563893+00'),
	('ce319056-c6af-4e6a-88a9-8b42ed587b34', 'ef16a9dc-81f5-41eb-a9a8-1bee3e527c2e', '2026-02-08 18:41:26.563893+00'),
	('ab1fefb5-3fc7-4f90-943d-405a0694414a', 'a4f6c18b-2db8-4a97-8919-f3119592f5a1', '2026-02-08 18:41:26.563893+00'),
	('1924aecc-357a-4a6b-9b5e-bc26f5fe8f5b', 'a4f6c18b-2db8-4a97-8919-f3119592f5a1', '2026-02-08 18:41:26.563893+00'),
	('8a3141e3-e2e4-4a57-bb82-7531157a0231', 'a7ef9d28-2d2b-48d9-8657-81a76fd3b0ff', '2026-02-08 18:41:26.563893+00'),
	('62f6a21b-ceda-40b6-b871-a3d708ed701e', 'a7ef9d28-2d2b-48d9-8657-81a76fd3b0ff', '2026-02-08 18:41:26.563893+00'),
	('3aab11a2-f533-48cf-8ef3-5c8c6f322842', 'a7ef9d28-2d2b-48d9-8657-81a76fd3b0ff', '2026-02-08 18:41:26.563893+00'),
	('2311e6e8-5937-43f3-ada4-fd7f9cfe92ae', 'ef16a9dc-81f5-41eb-a9a8-1bee3e527c2e', '2026-02-08 18:41:26.563893+00'),
	('ec6dfbc1-ea14-40ed-af7b-a21b763c7d11', '689ddd46-a0b7-408e-abf5-4eb6a705e255', '2026-02-08 18:41:26.563893+00'),
	('a695e990-b089-4d3e-bdf7-f58edbf6f8e1', '2ad5e243-567e-4106-8714-2fde2d8e1913', '2026-02-08 18:41:26.563893+00'),
	('1ce576dc-c477-4e00-86c7-69dd84bb5c61', '2ad5e243-567e-4106-8714-2fde2d8e1913', '2026-02-08 18:41:26.563893+00'),
	('549e6433-5b68-47ad-8153-19aa89df8baa', '0836da15-b540-4672-8c78-c07565892d97', '2026-02-08 18:41:26.563893+00'),
	('568f6382-548f-455e-9f27-562d69485e0b', '0836da15-b540-4672-8c78-c07565892d97', '2026-02-08 18:41:26.563893+00'),
	('a0c02b96-eb49-42d9-acb5-11bba8e7d7de', '0836da15-b540-4672-8c78-c07565892d97', '2026-02-08 18:41:26.563893+00'),
	('54e77441-2d64-4083-9f76-3df0f530636d', '0836da15-b540-4672-8c78-c07565892d97', '2026-02-08 18:41:26.563893+00'),
	('a6c1be18-9af2-480a-bc40-d08b24f52238', '0836da15-b540-4672-8c78-c07565892d97', '2026-02-08 18:41:26.563893+00'),
	('d663ee4c-2bba-4135-93b2-a88bd012a942', '0836da15-b540-4672-8c78-c07565892d97', '2026-02-08 18:41:26.563893+00'),
	('4d503fbb-7c90-4398-b2ce-502775e043b0', '0836da15-b540-4672-8c78-c07565892d97', '2026-02-08 18:41:26.563893+00'),
	('582cf4b6-be78-4c9f-aac6-87bd3dd895a2', '9cecaa93-7147-41ee-a26e-b9b3dac4072a', '2026-02-08 18:41:26.563893+00'),
	('315d8b39-0899-4ed2-8051-bc3f368f1747', '9cecaa93-7147-41ee-a26e-b9b3dac4072a', '2026-02-08 18:41:26.563893+00'),
	('dc847633-b980-4ef3-addc-2a6361936fcd', '9cecaa93-7147-41ee-a26e-b9b3dac4072a', '2026-02-08 18:41:26.563893+00'),
	('ce271eff-550c-4ac4-a391-ca28e2a8fc25', '9cecaa93-7147-41ee-a26e-b9b3dac4072a', '2026-02-08 18:41:26.563893+00'),
	('bd9bc019-0a87-41b9-8e29-36aa1606a8e8', '9cecaa93-7147-41ee-a26e-b9b3dac4072a', '2026-02-08 18:41:26.563893+00'),
	('ee6696ae-c45f-48a1-aae7-001dfefb7a8d', 'a4f6c18b-2db8-4a97-8919-f3119592f5a1', '2026-02-08 18:41:26.563893+00'),
	('1d9ac8e6-409b-4712-8df0-8f9dd5860312', 'a4f6c18b-2db8-4a97-8919-f3119592f5a1', '2026-02-08 18:41:26.563893+00'),
	('5ab6087a-c2fe-469a-9c03-e61e68f180cf', 'abeedc3e-4bf5-46c9-8aee-bcd7b69ad279', '2026-02-08 18:41:26.563893+00'),
	('89ee1bf8-e8b5-4d1c-92d1-e82dbef26e44', '689ddd46-a0b7-408e-abf5-4eb6a705e255', '2026-02-08 18:41:26.563893+00'),
	('042007b8-0c0d-4cec-a42f-416a0e6273d8', '689ddd46-a0b7-408e-abf5-4eb6a705e255', '2026-02-08 18:41:26.563893+00'),
	('e16f7292-1b27-47df-9a40-3b51e0ac5616', 'a0f4922e-658b-4764-b7fc-4d857c0bc898', '2026-02-08 18:41:26.563893+00'),
	('f387003f-82ba-4e32-b0f1-9c89f640320b', 'a0f4922e-658b-4764-b7fc-4d857c0bc898', '2026-02-08 18:41:26.563893+00'),
	('10aff147-062e-4078-8be1-3b43d2c9898a', 'a0f4922e-658b-4764-b7fc-4d857c0bc898', '2026-02-08 18:41:26.563893+00'),
	('aa1cb7d0-552e-49e3-b5b0-f5137ab28dc1', 'a0f4922e-658b-4764-b7fc-4d857c0bc898', '2026-02-08 18:41:26.563893+00'),
	('de5e1ac9-90e2-45dd-b75a-08b2e794fc28', 'a0f4922e-658b-4764-b7fc-4d857c0bc898', '2026-02-08 18:41:26.563893+00'),
	('d6b43311-5397-4868-8695-aae904226f49', 'a0f4922e-658b-4764-b7fc-4d857c0bc898', '2026-02-08 18:41:26.563893+00'),
	('c966b67d-eab5-4b8c-80d2-9f9019bfaf68', 'a0f4922e-658b-4764-b7fc-4d857c0bc898', '2026-02-08 18:41:26.563893+00'),
	('9ea18f05-08a6-4352-b4f8-20d8f6f2eded', '33f1186b-7e46-4814-b2d2-c58e97a3f1f8', '2026-02-08 18:41:26.563893+00'),
	('223febb1-ad9e-4dc7-857c-54413263b56c', '247d79b2-d86a-4556-81d5-310cc89e9aa0', '2026-02-08 18:41:26.563893+00'),
	('3e090bfb-7daa-4544-a027-4d9e9893ffe4', '9cecaa93-7147-41ee-a26e-b9b3dac4072a', '2026-02-08 18:41:26.563893+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

-- SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict Tm39QIV2pX2QwWV9dk1OmfBzldjERGbiFHQGUebBv8ieJdh46avjKh6cWzZPuPQ

RESET ALL;
