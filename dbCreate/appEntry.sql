--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: webadmin
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO webadmin;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: webadmin
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ClientM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."ClientM" (
    id integer NOT NULL,
    "clientName" text NOT NULL,
    "shortCode" text NOT NULL,
    remarks text,
    "dbName" text NOT NULL,
    "isActive" boolean NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ClientM" OWNER TO webadmin;

--
-- Name: ClientUserX; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."ClientUserX" (
    id integer NOT NULL,
    "clientId" integer NOT NULL,
    "userId" integer NOT NULL,
    emarks text
);


ALTER TABLE public."ClientUserX" OWNER TO webadmin;

--
-- Name: ClientUserX_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."ClientUserX" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."ClientUserX_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- Name: ComponentM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."ComponentM" (
    id smallint NOT NULL,
    path text NOT NULL,
    remarks text,
    "controlId" smallint NOT NULL
);


ALTER TABLE public."ComponentM" OWNER TO webadmin;

--
-- Name: IdGeneratorTable; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."IdGeneratorTable" (
    id integer NOT NULL,
    "tableName" text NOT NULL,
    "lastId" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."IdGeneratorTable" OWNER TO webadmin;

--
-- Name: IdGeneratorTable_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."IdGeneratorTable" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."IdGeneratorTable_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- Name: RoleComponentX; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."RoleComponentX" (
    id integer NOT NULL,
    "componentId" smallint NOT NULL,
    "roleId" smallint NOT NULL,
    "isEnabled" boolean NOT NULL
);


ALTER TABLE public."RoleComponentX" OWNER TO webadmin;

--
-- Name: RoleComponentX_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."RoleComponentX" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."RoleComponentX_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: RoleM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."RoleM" (
    id smallint NOT NULL,
    "roleName" text NOT NULL,
    remarks text,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."RoleM" OWNER TO webadmin;

--
-- Name: UserM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."UserM" (
    id bigint NOT NULL,
    "tenantId" integer NOT NULL,
    "roleId" smallint,
    "userName" text NOT NULL,
    uid text NOT NULL,
    hash text NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    "parentId" bigint NOT NULL,
    "userEmail" text,
    remarks text,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userMobileNo" text NOT NULL,
    "branchIds" smallint[],
    "lastBranchId" smallint
);


ALTER TABLE public."UserM" OWNER TO webadmin;

--
-- Name: UserM_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."UserM" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."UserM_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- Data for Name: ClientM; Type: TABLE DATA; Schema: public; Owner: webadmin
--

INSERT INTO public."ClientM" VALUES (1, 's1', 's1', 's1', 's1_db', true, '2022-09-25 14:34:48.772252+00');
INSERT INTO public."ClientM" VALUES (2, 's2', 's2', '', 's2_db', true, '2022-09-25 14:40:01.756116+00');
INSERT INTO public."ClientM" VALUES (3, 's3', 's3', 's3', 's3_db', true, '2022-09-25 14:41:21.106522+00');
INSERT INTO public."ClientM" VALUES (4, 's4', 's4', 's4', 's4_db', true, '2022-09-25 14:42:28.15919+00');
INSERT INTO public."ClientM" VALUES (5, 's5', 's5', 's5', 's5_db', true, '2022-09-25 14:43:05.825132+00');
INSERT INTO public."ClientM" VALUES (6, 's6', 's6', '', 's6_db', true, '2022-09-25 14:46:14.581906+00');
INSERT INTO public."ClientM" VALUES (7, 's7', 's7', '', 's7_db', true, '2022-09-25 14:46:26.148863+00');
INSERT INTO public."ClientM" VALUES (8, 's8', 's8', '', 's8_db', true, '2022-09-25 15:20:05.805734+00');
INSERT INTO public."ClientM" VALUES (9, 's9', 's9', '', 's9_db', true, '2022-09-25 15:20:25.605643+00');
INSERT INTO public."ClientM" VALUES (10, 's10', 's10', '', 's10_db', true, '2022-09-25 15:21:07.552679+00');


--
-- Data for Name: ClientUserX; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: ComponentM; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: IdGeneratorTable; Type: TABLE DATA; Schema: public; Owner: webadmin
--

INSERT INTO public."IdGeneratorTable" OVERRIDING SYSTEM VALUE VALUES (2, 'ClientM', 10);


--
-- Data for Name: RoleComponentX; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: RoleM; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: UserM; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Name: ClientUserX_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."ClientUserX_id_seq"', 1, false);


--
-- Name: IdGeneratorTable_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."IdGeneratorTable_id_seq"', 2, true);


--
-- Name: RoleComponentX_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."RoleComponentX_id_seq"', 1, false);


--
-- Name: UserM_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."UserM_id_seq"', 1, false);


--
-- Name: ClientM ClientM_clientName_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."ClientM"
    ADD CONSTRAINT "ClientM_clientName_key" UNIQUE ("clientName");


--
-- Name: ClientM ClientM_dbName_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."ClientM"
    ADD CONSTRAINT "ClientM_dbName_key" UNIQUE ("dbName");


--
-- Name: ClientM ClientM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."ClientM"
    ADD CONSTRAINT "ClientM_pkey" PRIMARY KEY (id);


--
-- Name: ClientM ClientM_shortCode_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."ClientM"
    ADD CONSTRAINT "ClientM_shortCode_key" UNIQUE ("shortCode");


--
-- Name: ClientUserX ClientUserX_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."ClientUserX"
    ADD CONSTRAINT "ClientUserX_pkey" PRIMARY KEY (id);


--
-- Name: ComponentM ComponentM_controlId_unique_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."ComponentM"
    ADD CONSTRAINT "ComponentM_controlId_unique_key" UNIQUE ("controlId");


--
-- Name: ComponentM ComponentM_path_unique_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."ComponentM"
    ADD CONSTRAINT "ComponentM_path_unique_key" UNIQUE (path);


--
-- Name: ComponentM ComponentM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."ComponentM"
    ADD CONSTRAINT "ComponentM_pkey" PRIMARY KEY (id);


--
-- Name: IdGeneratorTable IdGeneratorTable_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."IdGeneratorTable"
    ADD CONSTRAINT "IdGeneratorTable_pkey" PRIMARY KEY (id);


--
-- Name: IdGeneratorTable IdGeneratorTable_tableName_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."IdGeneratorTable"
    ADD CONSTRAINT "IdGeneratorTable_tableName_key" UNIQUE ("tableName");


--
-- Name: RoleComponentX RoleComponentX_componentId_roleId_unique_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."RoleComponentX"
    ADD CONSTRAINT "RoleComponentX_componentId_roleId_unique_key" UNIQUE ("componentId", "roleId");


--
-- Name: RoleComponentX RoleComponentX_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."RoleComponentX"
    ADD CONSTRAINT "RoleComponentX_pkey" PRIMARY KEY (id);


--
-- Name: RoleM RoleM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."RoleM"
    ADD CONSTRAINT "RoleM_pkey" PRIMARY KEY (id);


--
-- Name: RoleM RoleM_roleName_uique_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."RoleM"
    ADD CONSTRAINT "RoleM_roleName_uique_key" UNIQUE ("roleName");


--
-- Name: UserM UserM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."UserM"
    ADD CONSTRAINT "UserM_pkey" PRIMARY KEY (id);


--
-- Name: UserM UserM_uid_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."UserM"
    ADD CONSTRAINT "UserM_uid_key" UNIQUE (uid);


--
-- Name: UserM UserM_userEmail_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."UserM"
    ADD CONSTRAINT "UserM_userEmail_key" UNIQUE ("userEmail");


--
-- Name: UserM UserM_userMobileNo_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."UserM"
    ADD CONSTRAINT "UserM_userMobileNo_key" UNIQUE ("userMobileNo");


--
-- Name: ClientUserX ClientUserX_clientId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."ClientUserX"
    ADD CONSTRAINT "ClientUserX_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public."ClientM"(id) NOT VALID;


--
-- Name: ClientUserX ClientUserX_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."ClientUserX"
    ADD CONSTRAINT "ClientUserX_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."UserM"(id) NOT VALID;


--
-- Name: RoleComponentX RoleComponentX_componentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."RoleComponentX"
    ADD CONSTRAINT "RoleComponentX_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES public."ComponentM"(id);


--
-- Name: RoleComponentX RoleComponentX_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."RoleComponentX"
    ADD CONSTRAINT "RoleComponentX_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."RoleM"(id);


--
-- Name: UserM UserM_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."UserM"
    ADD CONSTRAINT "UserM_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."UserM"(id);


--
-- Name: UserM UserM_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."UserM"
    ADD CONSTRAINT "UserM_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."RoleM"(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: webadmin
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO webadmin;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

