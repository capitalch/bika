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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: BookingActionD; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."BookingActionD" (
    id bigint NOT NULL,
    "tranDate" date NOT NULL,
    "bookingActionId" smallint NOT NULL,
    "bookingStatusId" smallint NOT NULL,
    "lineRemarks" text
);


ALTER TABLE public."BookingActionD" OWNER TO webadmin;

--
-- Name: BookingActionM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."BookingActionM" (
    id smallint NOT NULL,
    "actionName" text NOT NULL,
    remarks text
);


ALTER TABLE public."BookingActionM" OWNER TO webadmin;

--
-- Name: BookingAction_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."BookingActionD" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."BookingAction_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- Name: BookingBill; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."BookingBill" (
    id bigint NOT NULL,
    "bookingMainId" bigint NOT NULL,
    "tranDate" date NOT NULL,
    amount numeric(15,2) DEFAULT 0 NOT NULL,
    remarks text
);


ALTER TABLE public."BookingBill" OWNER TO webadmin;

--
-- Name: BookingBill_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."BookingBill" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."BookingBill_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- Name: BookingHall; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."BookingHall" (
    id bigint NOT NULL,
    "bookingMainId" bigint NOT NULL,
    "eventDate" date NOT NULL,
    "eventTypeId" smallint NOT NULL,
    "hallId" smallint NOT NULL,
    "timeSlotId" smallint NOT NULL,
    "startTime" time with time zone NOT NULL,
    "endTime" time with time zone NOT NULL,
    "lineRemarks" text,
    "menuId" integer NOT NULL,
    pax numeric(7,0) DEFAULT 1 NOT NULL,
    "boardToRead" text,
    "quotedRate" numeric(15,2),
    "finalRate" numeric(15,2)
);


ALTER TABLE public."BookingHall" OWNER TO webadmin;

--
-- Name: BookingHallMenuItemX; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."BookingHallMenuItemX" (
    id bigint NOT NULL,
    "bookingHallId" bigint NOT NULL,
    "menuItemId" integer NOT NULL,
    "departmentId" integer NOT NULL,
    points numeric(9,2),
    remarks text
);


ALTER TABLE public."BookingHallMenuItemX" OWNER TO webadmin;

--
-- Name: BookingHallFoodItem_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."BookingHallMenuItemX" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."BookingHallFoodItem_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- Name: BookingHall_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."BookingHall" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."BookingHall_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- Name: BookingLog; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."BookingLog" (
    id bigint NOT NULL,
    "bookingMainId" bigint NOT NULL,
    "jData" jsonb,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."BookingLog" OWNER TO webadmin;

--
-- Name: BookingLog_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."BookingLog" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."BookingLog_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- Name: BookingMain; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."BookingMain" (
    id bigint NOT NULL,
    "tranDate" date NOT NULL,
    "custId" integer NOT NULL,
    "currentStatusId" smallint NOT NULL,
    "allowCancel" boolean NOT NULL,
    "cancelCharges" numeric(15,2) DEFAULT 0 NOT NULL,
    "commonRemarks" text,
    priority character(1) DEFAULT 'L'::bpchar NOT NULL,
    "jData" jsonb,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "finalBillAmount" numeric(15,2),
    "custReferenceId" integer,
    "custGuaranterId" integer,
    "custRelationId" integer
);


ALTER TABLE public."BookingMain" OWNER TO webadmin;

--
-- Name: BookingMain_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."BookingMain" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."BookingMain_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- Name: BookingNoCounter; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."BookingNoCounter" (
    id integer NOT NULL,
    "branchId" smallint NOT NULL,
    "lastBookingNo" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."BookingNoCounter" OWNER TO webadmin;

--
-- Name: BookingNoCounter_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."BookingNoCounter" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."BookingNoCounter_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: BookingReceipt; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."BookingReceipt" (
    id bigint NOT NULL,
    "bookingMainId" bigint NOT NULL,
    "tranDate" date NOT NULL,
    amount numeric(15,2) DEFAULT 0 NOT NULL,
    dc character(1) DEFAULT 'D'::bpchar,
    remarks text
);


ALTER TABLE public."BookingReceipt" OWNER TO webadmin;

--
-- Name: BookingReceipt_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."BookingReceipt" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."BookingReceipt_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- Name: BookingStatusM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."BookingStatusM" (
    id smallint NOT NULL,
    "statusName" text NOT NULL,
    remarks text
);


ALTER TABLE public."BookingStatusM" OWNER TO webadmin;

--
-- Name: BranchM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."BranchM" (
    id smallint NOT NULL,
    "branchName" text NOT NULL,
    "shortCode" text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."BranchM" OWNER TO webadmin;

--
-- Name: BranchSettings; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."BranchSettings" (
    id smallint NOT NULL,
    "branchId" smallint NOT NULL,
    key text NOT NULL,
    "textValue" text,
    "numericValue" numeric(17,2) DEFAULT 0 NOT NULL,
    "jData" jsonb,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."BranchSettings" OWNER TO webadmin;

--
-- Name: CityM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."CityM" (
    id smallint NOT NULL,
    "stateId" smallint NOT NULL,
    "cityName" text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."CityM" OWNER TO webadmin;

--
-- Name: CustomerM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."CustomerM" (
    id integer NOT NULL,
    "custName" text NOT NULL,
    address1 text NOT NULL,
    address2 text,
    pin numeric(10,0),
    "primaryPhone" text,
    "otherPhones" text,
    "cityId" smallint NOT NULL,
    email text,
    remarks text,
    "jData" jsonb,
    "annDate" date,
    gstin text,
    dob date,
    "timestamp" timestamp with time zone NOT NULL,
    "custType" character(1) DEFAULT 'I'::bpchar NOT NULL,
    reference text
);


ALTER TABLE public."CustomerM" OWNER TO webadmin;

--
-- Name: CustomerM_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."CustomerM" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."CustomerM_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- Name: DateTypeD; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."DateTypeD" (
    id integer NOT NULL,
    mdate date NOT NULL,
    "dateTypeId" smallint NOT NULL,
    remarks text
);


ALTER TABLE public."DateTypeD" OWNER TO webadmin;

--
-- Name: DateTypeD_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."DateTypeD" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."DateTypeD_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: DateTypeM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."DateTypeM" (
    id smallint NOT NULL,
    "dateTypeName" text NOT NULL,
    remarks text
);


ALTER TABLE public."DateTypeM" OWNER TO webadmin;

--
-- Name: DepartmentM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."DepartmentM" (
    id integer NOT NULL,
    "depName" text NOT NULL,
    remarks text,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "branchId" smallint NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "isInternal" boolean DEFAULT true NOT NULL,
    "inchargeName" text,
    "mobileNo" text
);


ALTER TABLE public."DepartmentM" OWNER TO webadmin;

--
-- Name: DepartmentM_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."DepartmentM" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."DepartmentM_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- Name: Enquiry; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."Enquiry" (
    id integer NOT NULL,
    "tranDate" date NOT NULL,
    "eventDate" date NOT NULL,
    "hallId" smallint NOT NULL,
    "custId" integer,
    remarks text,
    "jData" jsonb,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Enquiry" OWNER TO webadmin;

--
-- Name: Enquiry_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."Enquiry" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Enquiry_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: EventTypeM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."EventTypeM" (
    id smallint NOT NULL,
    "eventTypeName" text NOT NULL,
    remarks text,
    "advanceInPerc" numeric(5,2) DEFAULT 0 NOT NULL
);


ALTER TABLE public."EventTypeM" OWNER TO webadmin;

--
-- Name: GlobalSettings; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."GlobalSettings" (
    id smallint NOT NULL,
    key text NOT NULL,
    "textValue" text,
    "numericValue" numeric(17,2) DEFAULT 0 NOT NULL,
    "jData" jsonb,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."GlobalSettings" OWNER TO webadmin;

--
-- Name: HallM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."HallM" (
    id smallint NOT NULL,
    "branchId" smallint NOT NULL,
    "hallName" text NOT NULL,
    "cancelChargeInPerc" numeric(2,0) DEFAULT 0 NOT NULL,
    remarks text,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."HallM" OWNER TO webadmin;

--
-- Name: MenuItemM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."MenuItemM" (
    id integer NOT NULL,
    "menuItemName" text NOT NULL,
    remarks text,
    ingredients text,
    "imageUrl" text,
    points numeric(9,2) NOT NULL,
    "unitId" smallint NOT NULL,
    "customSortId" smallint DEFAULT 0 NOT NULL,
    "jData" jsonb,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "menuId" integer NOT NULL,
    "departmentId" integer NOT NULL,
    "parentId" integer,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."MenuItemM" OWNER TO webadmin;

--
-- Name: MenuItemM_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."MenuItemM" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."MenuItemM_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- Name: MenuM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."MenuM" (
    id integer NOT NULL,
    "menuName" text NOT NULL,
    remarks text,
    "jData" jsonb,
    "isActive" boolean DEFAULT true NOT NULL,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."MenuM" OWNER TO webadmin;

--
-- Name: MenuM_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."MenuM" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."MenuM_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- Name: Notes; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."Notes" (
    id integer NOT NULL,
    "branchId" smallint NOT NULL,
    "notesDate" date DEFAULT CURRENT_DATE NOT NULL,
    "endDate" date,
    remarks text,
    "jData" jsonb,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."Notes" OWNER TO webadmin;

--
-- Name: Notes_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."Notes" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."Notes_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: StateM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."StateM" (
    id smallint NOT NULL,
    "stateName" text NOT NULL,
    "stateCode" text,
    "isActive" boolean DEFAULT true NOT NULL,
    "gstCode" numeric(2,0) DEFAULT 0 NOT NULL
);


ALTER TABLE public."StateM" OWNER TO webadmin;

--
-- Name: TableIdCounter; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."TableIdCounter" (
    id integer NOT NULL,
    "tableName" text NOT NULL,
    "lastId" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."TableIdCounter" OWNER TO webadmin;

--
-- Name: TableIdCounter_id_seq; Type: SEQUENCE; Schema: public; Owner: webadmin
--

ALTER TABLE public."TableIdCounter" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."TableIdCounter_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);


--
-- Name: TimeSlotM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."TimeSlotM" (
    id smallint NOT NULL,
    "timeSlotName" text NOT NULL,
    remarks text,
    "startTime" time with time zone NOT NULL,
    "endTime" time with time zone NOT NULL
);


ALTER TABLE public."TimeSlotM" OWNER TO webadmin;

--
-- Name: UnitM; Type: TABLE; Schema: public; Owner: webadmin
--

CREATE TABLE public."UnitM" (
    id smallint NOT NULL,
    "unitName" text NOT NULL,
    symbol text NOT NULL,
    remarks text
);


ALTER TABLE public."UnitM" OWNER TO webadmin;

--
-- Data for Name: BookingActionD; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: BookingActionM; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: BookingBill; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: BookingHall; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: BookingHallMenuItemX; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: BookingLog; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: BookingMain; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: BookingNoCounter; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: BookingReceipt; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: BookingStatusM; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: BranchM; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: BranchSettings; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: CityM; Type: TABLE DATA; Schema: public; Owner: webadmin
--

INSERT INTO public."CityM" VALUES (1, 32, 'North and Middle Andaman', true);
INSERT INTO public."CityM" VALUES (2, 32, 'South Andaman', true);
INSERT INTO public."CityM" VALUES (3, 32, 'Nicobar', true);
INSERT INTO public."CityM" VALUES (4, 1, 'Adilabad', true);
INSERT INTO public."CityM" VALUES (5, 1, 'Anantapur', true);
INSERT INTO public."CityM" VALUES (6, 1, 'Chittoor', true);
INSERT INTO public."CityM" VALUES (7, 1, 'East Godavari', true);
INSERT INTO public."CityM" VALUES (8, 1, 'Guntur', true);
INSERT INTO public."CityM" VALUES (9, 1, 'Hyderabad', true);
INSERT INTO public."CityM" VALUES (10, 1, 'Kadapa', true);
INSERT INTO public."CityM" VALUES (11, 1, 'Karimnagar', true);
INSERT INTO public."CityM" VALUES (12, 1, 'Khammam', true);
INSERT INTO public."CityM" VALUES (13, 1, 'Krishna', true);
INSERT INTO public."CityM" VALUES (14, 1, 'Kurnool', true);
INSERT INTO public."CityM" VALUES (15, 1, 'Mahbubnagar', true);
INSERT INTO public."CityM" VALUES (16, 1, 'Medak', true);
INSERT INTO public."CityM" VALUES (17, 1, 'Nalgonda', true);
INSERT INTO public."CityM" VALUES (18, 1, 'Nellore', true);
INSERT INTO public."CityM" VALUES (19, 1, 'Nizamabad', true);
INSERT INTO public."CityM" VALUES (20, 1, 'Prakasam', true);
INSERT INTO public."CityM" VALUES (21, 1, 'Rangareddi', true);
INSERT INTO public."CityM" VALUES (22, 1, 'Srikakulam', true);
INSERT INTO public."CityM" VALUES (23, 1, 'Vishakhapatnam', true);
INSERT INTO public."CityM" VALUES (24, 1, 'Vizianagaram', true);
INSERT INTO public."CityM" VALUES (25, 1, 'Warangal', true);
INSERT INTO public."CityM" VALUES (26, 1, 'West Godavari', true);
INSERT INTO public."CityM" VALUES (27, 3, 'Anjaw', true);
INSERT INTO public."CityM" VALUES (28, 3, 'Changlang', true);
INSERT INTO public."CityM" VALUES (29, 3, 'East Kameng', true);
INSERT INTO public."CityM" VALUES (30, 3, 'Lohit', true);
INSERT INTO public."CityM" VALUES (31, 3, 'Lower Subansiri', true);
INSERT INTO public."CityM" VALUES (32, 3, 'Papum Pare', true);
INSERT INTO public."CityM" VALUES (33, 3, 'Tirap', true);
INSERT INTO public."CityM" VALUES (34, 3, 'Dibang Valley', true);
INSERT INTO public."CityM" VALUES (35, 3, 'Upper Subansiri', true);
INSERT INTO public."CityM" VALUES (36, 3, 'West Kameng', true);
INSERT INTO public."CityM" VALUES (37, 2, 'Barpeta', true);
INSERT INTO public."CityM" VALUES (38, 2, 'Bongaigaon', true);
INSERT INTO public."CityM" VALUES (39, 2, 'Cachar', true);
INSERT INTO public."CityM" VALUES (40, 2, 'Darrang', true);
INSERT INTO public."CityM" VALUES (41, 2, 'Dhemaji', true);
INSERT INTO public."CityM" VALUES (42, 2, 'Dhubri', true);
INSERT INTO public."CityM" VALUES (43, 2, 'Dibrugarh', true);
INSERT INTO public."CityM" VALUES (44, 2, 'Goalpara', true);
INSERT INTO public."CityM" VALUES (45, 2, 'Golaghat', true);
INSERT INTO public."CityM" VALUES (46, 2, 'Hailakandi', true);
INSERT INTO public."CityM" VALUES (47, 2, 'Jorhat', true);
INSERT INTO public."CityM" VALUES (48, 2, 'Karbi Anglong', true);
INSERT INTO public."CityM" VALUES (49, 2, 'Karimganj', true);
INSERT INTO public."CityM" VALUES (50, 2, 'Kokrajhar', true);
INSERT INTO public."CityM" VALUES (51, 2, 'Lakhimpur', true);
INSERT INTO public."CityM" VALUES (52, 2, 'Marigaon', true);
INSERT INTO public."CityM" VALUES (53, 2, 'Nagaon', true);
INSERT INTO public."CityM" VALUES (54, 2, 'Nalbari', true);
INSERT INTO public."CityM" VALUES (55, 2, 'North Cachar Hills', true);
INSERT INTO public."CityM" VALUES (56, 2, 'Sibsagar', true);
INSERT INTO public."CityM" VALUES (57, 2, 'Sonitpur', true);
INSERT INTO public."CityM" VALUES (58, 2, 'Tinsukia', true);
INSERT INTO public."CityM" VALUES (59, 4, 'Araria', true);
INSERT INTO public."CityM" VALUES (60, 4, 'Aurangabad', true);
INSERT INTO public."CityM" VALUES (61, 4, 'Banka', true);
INSERT INTO public."CityM" VALUES (62, 4, 'Begusarai', true);
INSERT INTO public."CityM" VALUES (63, 4, 'Bhagalpur', true);
INSERT INTO public."CityM" VALUES (64, 4, 'Bhojpur', true);
INSERT INTO public."CityM" VALUES (65, 4, 'Buxar', true);
INSERT INTO public."CityM" VALUES (66, 4, 'Darbhanga', true);
INSERT INTO public."CityM" VALUES (67, 4, 'Purba Champaran', true);
INSERT INTO public."CityM" VALUES (68, 4, 'Gaya', true);
INSERT INTO public."CityM" VALUES (69, 4, 'Gopalganj', true);
INSERT INTO public."CityM" VALUES (70, 4, 'Jamui', true);
INSERT INTO public."CityM" VALUES (71, 4, 'Jehanabad', true);
INSERT INTO public."CityM" VALUES (72, 4, 'Khagaria', true);
INSERT INTO public."CityM" VALUES (73, 4, 'Kishanganj', true);
INSERT INTO public."CityM" VALUES (74, 4, 'Kaimur', true);
INSERT INTO public."CityM" VALUES (75, 4, 'Katihar', true);
INSERT INTO public."CityM" VALUES (76, 4, 'Lakhisarai', true);
INSERT INTO public."CityM" VALUES (77, 4, 'Madhubani', true);
INSERT INTO public."CityM" VALUES (78, 4, 'Munger', true);
INSERT INTO public."CityM" VALUES (79, 4, 'Madhepura', true);
INSERT INTO public."CityM" VALUES (80, 4, 'Muzaffarpur', true);
INSERT INTO public."CityM" VALUES (81, 4, 'Nalanda', true);
INSERT INTO public."CityM" VALUES (82, 4, 'Nawada', true);
INSERT INTO public."CityM" VALUES (83, 4, 'Patna', true);
INSERT INTO public."CityM" VALUES (84, 4, 'Purnia', true);
INSERT INTO public."CityM" VALUES (85, 4, 'Rohtas', true);
INSERT INTO public."CityM" VALUES (86, 4, 'Saharsa', true);
INSERT INTO public."CityM" VALUES (87, 4, 'Samastipur', true);
INSERT INTO public."CityM" VALUES (88, 4, 'Sheohar', true);
INSERT INTO public."CityM" VALUES (89, 4, 'Sheikhpura', true);
INSERT INTO public."CityM" VALUES (90, 4, 'Saran', true);
INSERT INTO public."CityM" VALUES (91, 4, 'Sitamarhi', true);
INSERT INTO public."CityM" VALUES (92, 4, 'Supaul', true);
INSERT INTO public."CityM" VALUES (93, 4, 'Siwan', true);
INSERT INTO public."CityM" VALUES (94, 4, 'Vaishali', true);
INSERT INTO public."CityM" VALUES (95, 4, 'Pashchim Champaran', true);
INSERT INTO public."CityM" VALUES (96, 35, 'Bastar', true);
INSERT INTO public."CityM" VALUES (97, 35, 'Bilaspur', true);
INSERT INTO public."CityM" VALUES (98, 35, 'Dantewada', true);
INSERT INTO public."CityM" VALUES (99, 35, 'Dhamtari', true);
INSERT INTO public."CityM" VALUES (100, 35, 'Durg', true);
INSERT INTO public."CityM" VALUES (101, 35, 'Jashpur', true);
INSERT INTO public."CityM" VALUES (102, 35, 'Janjgir-Champa', true);
INSERT INTO public."CityM" VALUES (103, 35, 'Korba', true);
INSERT INTO public."CityM" VALUES (104, 35, 'Koriya', true);
INSERT INTO public."CityM" VALUES (105, 35, 'Kanker', true);
INSERT INTO public."CityM" VALUES (106, 35, 'Kawardha', true);
INSERT INTO public."CityM" VALUES (107, 35, 'Mahasamund', true);
INSERT INTO public."CityM" VALUES (108, 35, 'Raigarh', true);
INSERT INTO public."CityM" VALUES (109, 35, 'Rajnandgaon', true);
INSERT INTO public."CityM" VALUES (110, 35, 'Raipur', true);
INSERT INTO public."CityM" VALUES (111, 35, 'Surguja', true);
INSERT INTO public."CityM" VALUES (112, 29, 'Diu', true);
INSERT INTO public."CityM" VALUES (113, 29, 'Daman', true);
INSERT INTO public."CityM" VALUES (114, 25, 'Central Delhi', true);
INSERT INTO public."CityM" VALUES (115, 25, 'East Delhi', true);
INSERT INTO public."CityM" VALUES (116, 25, 'New Delhi', true);
INSERT INTO public."CityM" VALUES (117, 25, 'North Delhi', true);
INSERT INTO public."CityM" VALUES (118, 25, 'North East Delhi', true);
INSERT INTO public."CityM" VALUES (119, 25, 'North West Delhi', true);
INSERT INTO public."CityM" VALUES (120, 25, 'South Delhi', true);
INSERT INTO public."CityM" VALUES (121, 25, 'South West Delhi', true);
INSERT INTO public."CityM" VALUES (122, 25, 'West Delhi', true);
INSERT INTO public."CityM" VALUES (123, 26, 'North Goa', true);
INSERT INTO public."CityM" VALUES (124, 26, 'South Goa', true);
INSERT INTO public."CityM" VALUES (125, 5, 'Ahmedabad', true);
INSERT INTO public."CityM" VALUES (126, 5, 'Amreli District', true);
INSERT INTO public."CityM" VALUES (127, 5, 'Anand', true);
INSERT INTO public."CityM" VALUES (128, 5, 'Banaskantha', true);
INSERT INTO public."CityM" VALUES (129, 5, 'Bharuch', true);
INSERT INTO public."CityM" VALUES (130, 5, 'Bhavnagar', true);
INSERT INTO public."CityM" VALUES (131, 5, 'Dahod', true);
INSERT INTO public."CityM" VALUES (132, 5, 'The Dangs', true);
INSERT INTO public."CityM" VALUES (133, 5, 'Gandhinagar', true);
INSERT INTO public."CityM" VALUES (134, 5, 'Jamnagar', true);
INSERT INTO public."CityM" VALUES (135, 5, 'Junagadh', true);
INSERT INTO public."CityM" VALUES (136, 5, 'Kutch', true);
INSERT INTO public."CityM" VALUES (137, 5, 'Kheda', true);
INSERT INTO public."CityM" VALUES (138, 5, 'Mehsana', true);
INSERT INTO public."CityM" VALUES (139, 5, 'Narmada', true);
INSERT INTO public."CityM" VALUES (140, 5, 'Navsari', true);
INSERT INTO public."CityM" VALUES (141, 5, 'Patan', true);
INSERT INTO public."CityM" VALUES (142, 5, 'Panchmahal', true);
INSERT INTO public."CityM" VALUES (143, 5, 'Porbandar', true);
INSERT INTO public."CityM" VALUES (144, 5, 'Rajkot', true);
INSERT INTO public."CityM" VALUES (145, 5, 'Sabarkantha', true);
INSERT INTO public."CityM" VALUES (146, 5, 'Surendranagar', true);
INSERT INTO public."CityM" VALUES (147, 5, 'Surat', true);
INSERT INTO public."CityM" VALUES (148, 5, 'Vadodara', true);
INSERT INTO public."CityM" VALUES (149, 5, 'Valsad', true);
INSERT INTO public."CityM" VALUES (150, 6, 'Ambala', true);
INSERT INTO public."CityM" VALUES (151, 6, 'Bhiwani', true);
INSERT INTO public."CityM" VALUES (152, 6, 'Faridabad', true);
INSERT INTO public."CityM" VALUES (153, 6, 'Fatehabad', true);
INSERT INTO public."CityM" VALUES (154, 6, 'Gurgaon', true);
INSERT INTO public."CityM" VALUES (155, 6, 'Hissar', true);
INSERT INTO public."CityM" VALUES (156, 6, 'Jhajjar', true);
INSERT INTO public."CityM" VALUES (157, 6, 'Jind', true);
INSERT INTO public."CityM" VALUES (158, 6, 'Karnal', true);
INSERT INTO public."CityM" VALUES (159, 6, 'Kaithal', true);
INSERT INTO public."CityM" VALUES (160, 6, 'Kurukshetra', true);
INSERT INTO public."CityM" VALUES (161, 6, 'Mahendragarh', true);
INSERT INTO public."CityM" VALUES (162, 6, 'Mewat', true);
INSERT INTO public."CityM" VALUES (163, 6, 'Panchkula', true);
INSERT INTO public."CityM" VALUES (164, 6, 'Panipat', true);
INSERT INTO public."CityM" VALUES (165, 6, 'Rewari', true);
INSERT INTO public."CityM" VALUES (166, 6, 'Rohtak', true);
INSERT INTO public."CityM" VALUES (167, 6, 'Sirsa', true);
INSERT INTO public."CityM" VALUES (168, 6, 'Sonepat', true);
INSERT INTO public."CityM" VALUES (169, 6, 'Yamuna Nagar', true);
INSERT INTO public."CityM" VALUES (170, 6, 'Palwal', true);
INSERT INTO public."CityM" VALUES (171, 7, 'Bilaspur', true);
INSERT INTO public."CityM" VALUES (172, 7, 'Chamba', true);
INSERT INTO public."CityM" VALUES (173, 7, 'Hamirpur', true);
INSERT INTO public."CityM" VALUES (174, 7, 'Kangra', true);
INSERT INTO public."CityM" VALUES (175, 7, 'Kinnaur', true);
INSERT INTO public."CityM" VALUES (176, 7, 'Kulu', true);
INSERT INTO public."CityM" VALUES (177, 7, 'Lahaul and Spiti', true);
INSERT INTO public."CityM" VALUES (178, 7, 'Mandi', true);
INSERT INTO public."CityM" VALUES (179, 7, 'Shimla', true);
INSERT INTO public."CityM" VALUES (180, 7, 'Sirmaur', true);
INSERT INTO public."CityM" VALUES (181, 7, 'Solan', true);
INSERT INTO public."CityM" VALUES (182, 7, 'Una', true);
INSERT INTO public."CityM" VALUES (183, 8, 'Anantnag', true);
INSERT INTO public."CityM" VALUES (184, 8, 'Badgam', true);
INSERT INTO public."CityM" VALUES (185, 8, 'Bandipore', true);
INSERT INTO public."CityM" VALUES (186, 8, 'Baramula', true);
INSERT INTO public."CityM" VALUES (187, 8, 'Doda', true);
INSERT INTO public."CityM" VALUES (188, 8, 'Jammu', true);
INSERT INTO public."CityM" VALUES (189, 8, 'Kargil', true);
INSERT INTO public."CityM" VALUES (190, 8, 'Kathua', true);
INSERT INTO public."CityM" VALUES (191, 8, 'Kupwara', true);
INSERT INTO public."CityM" VALUES (192, 8, 'Leh', true);
INSERT INTO public."CityM" VALUES (193, 8, 'Poonch', true);
INSERT INTO public."CityM" VALUES (194, 8, 'Pulwama', true);
INSERT INTO public."CityM" VALUES (195, 8, 'Rajauri', true);
INSERT INTO public."CityM" VALUES (196, 8, 'Srinagar', true);
INSERT INTO public."CityM" VALUES (197, 8, 'Samba', true);
INSERT INTO public."CityM" VALUES (198, 8, 'Udhampur', true);
INSERT INTO public."CityM" VALUES (199, 34, 'Bokaro', true);
INSERT INTO public."CityM" VALUES (200, 34, 'Chatra', true);
INSERT INTO public."CityM" VALUES (201, 34, 'Deoghar', true);
INSERT INTO public."CityM" VALUES (202, 34, 'Dhanbad', true);
INSERT INTO public."CityM" VALUES (203, 34, 'Dumka', true);
INSERT INTO public."CityM" VALUES (204, 34, 'Purba Singhbhum', true);
INSERT INTO public."CityM" VALUES (205, 34, 'Garhwa', true);
INSERT INTO public."CityM" VALUES (206, 34, 'Giridih', true);
INSERT INTO public."CityM" VALUES (207, 34, 'Godda', true);
INSERT INTO public."CityM" VALUES (208, 34, 'Gumla', true);
INSERT INTO public."CityM" VALUES (209, 34, 'Hazaribagh', true);
INSERT INTO public."CityM" VALUES (210, 34, 'Koderma', true);
INSERT INTO public."CityM" VALUES (211, 34, 'Lohardaga', true);
INSERT INTO public."CityM" VALUES (212, 34, 'Pakur', true);
INSERT INTO public."CityM" VALUES (213, 34, 'Palamu', true);
INSERT INTO public."CityM" VALUES (214, 34, 'Ranchi', true);
INSERT INTO public."CityM" VALUES (215, 34, 'Sahibganj', true);
INSERT INTO public."CityM" VALUES (216, 34, 'Seraikela and Kharsawan', true);
INSERT INTO public."CityM" VALUES (217, 34, 'Pashchim Singhbhum', true);
INSERT INTO public."CityM" VALUES (218, 34, 'Ramgarh', true);
INSERT INTO public."CityM" VALUES (219, 9, 'Bidar', true);
INSERT INTO public."CityM" VALUES (220, 9, 'Belgaum', true);
INSERT INTO public."CityM" VALUES (221, 9, 'Bijapur', true);
INSERT INTO public."CityM" VALUES (222, 9, 'Bagalkot', true);
INSERT INTO public."CityM" VALUES (223, 9, 'Bellary', true);
INSERT INTO public."CityM" VALUES (224, 9, 'Bangalore Rural District', true);
INSERT INTO public."CityM" VALUES (225, 9, 'Bangalore Urban District', true);
INSERT INTO public."CityM" VALUES (226, 9, 'Chamarajnagar', true);
INSERT INTO public."CityM" VALUES (227, 9, 'Chikmagalur', true);
INSERT INTO public."CityM" VALUES (228, 9, 'Chitradurga', true);
INSERT INTO public."CityM" VALUES (229, 9, 'Davanagere', true);
INSERT INTO public."CityM" VALUES (230, 9, 'Dharwad', true);
INSERT INTO public."CityM" VALUES (231, 9, 'Dakshina Kannada', true);
INSERT INTO public."CityM" VALUES (232, 9, 'Gadag', true);
INSERT INTO public."CityM" VALUES (233, 9, 'Gulbarga', true);
INSERT INTO public."CityM" VALUES (234, 9, 'Hassan', true);
INSERT INTO public."CityM" VALUES (235, 9, 'Haveri District', true);
INSERT INTO public."CityM" VALUES (236, 9, 'Kodagu', true);
INSERT INTO public."CityM" VALUES (237, 9, 'Kolar', true);
INSERT INTO public."CityM" VALUES (238, 9, 'Koppal', true);
INSERT INTO public."CityM" VALUES (239, 9, 'Mandya', true);
INSERT INTO public."CityM" VALUES (240, 9, 'Mysore', true);
INSERT INTO public."CityM" VALUES (241, 9, 'Raichur', true);
INSERT INTO public."CityM" VALUES (242, 9, 'Shimoga', true);
INSERT INTO public."CityM" VALUES (243, 9, 'Tumkur', true);
INSERT INTO public."CityM" VALUES (244, 9, 'Udupi', true);
INSERT INTO public."CityM" VALUES (245, 9, 'Uttara Kannada', true);
INSERT INTO public."CityM" VALUES (246, 9, 'Ramanagara', true);
INSERT INTO public."CityM" VALUES (247, 9, 'Chikballapur', true);
INSERT INTO public."CityM" VALUES (248, 9, 'Yadagiri', true);
INSERT INTO public."CityM" VALUES (249, 10, 'Alappuzha', true);
INSERT INTO public."CityM" VALUES (250, 10, 'Ernakulam', true);
INSERT INTO public."CityM" VALUES (251, 10, 'Idukki', true);
INSERT INTO public."CityM" VALUES (252, 10, 'Kollam', true);
INSERT INTO public."CityM" VALUES (253, 10, 'Kannur', true);
INSERT INTO public."CityM" VALUES (254, 10, 'Kasaragod', true);
INSERT INTO public."CityM" VALUES (255, 10, 'Kottayam', true);
INSERT INTO public."CityM" VALUES (256, 10, 'Kozhikode', true);
INSERT INTO public."CityM" VALUES (257, 10, 'Malappuram', true);
INSERT INTO public."CityM" VALUES (258, 10, 'Palakkad', true);
INSERT INTO public."CityM" VALUES (259, 10, 'Pathanamthitta', true);
INSERT INTO public."CityM" VALUES (260, 10, 'Thrissur', true);
INSERT INTO public."CityM" VALUES (261, 10, 'Thiruvananthapuram', true);
INSERT INTO public."CityM" VALUES (262, 10, 'Wayanad', true);
INSERT INTO public."CityM" VALUES (263, 11, 'Alirajpur', true);
INSERT INTO public."CityM" VALUES (264, 11, 'Anuppur', true);
INSERT INTO public."CityM" VALUES (265, 11, 'Ashok Nagar', true);
INSERT INTO public."CityM" VALUES (266, 11, 'Balaghat', true);
INSERT INTO public."CityM" VALUES (267, 11, 'Barwani', true);
INSERT INTO public."CityM" VALUES (268, 11, 'Betul', true);
INSERT INTO public."CityM" VALUES (269, 11, 'Bhind', true);
INSERT INTO public."CityM" VALUES (270, 11, 'Bhopal', true);
INSERT INTO public."CityM" VALUES (271, 11, 'Burhanpur', true);
INSERT INTO public."CityM" VALUES (272, 11, 'Chhatarpur', true);
INSERT INTO public."CityM" VALUES (273, 11, 'Chhindwara', true);
INSERT INTO public."CityM" VALUES (274, 11, 'Damoh', true);
INSERT INTO public."CityM" VALUES (275, 11, 'Datia', true);
INSERT INTO public."CityM" VALUES (276, 11, 'Dewas', true);
INSERT INTO public."CityM" VALUES (277, 11, 'Dhar', true);
INSERT INTO public."CityM" VALUES (278, 11, 'Dindori', true);
INSERT INTO public."CityM" VALUES (279, 11, 'Guna', true);
INSERT INTO public."CityM" VALUES (280, 11, 'Gwalior', true);
INSERT INTO public."CityM" VALUES (281, 11, 'Harda', true);
INSERT INTO public."CityM" VALUES (282, 11, 'Hoshangabad', true);
INSERT INTO public."CityM" VALUES (283, 11, 'Indore', true);
INSERT INTO public."CityM" VALUES (284, 11, 'Jabalpur', true);
INSERT INTO public."CityM" VALUES (285, 11, 'Jhabua', true);
INSERT INTO public."CityM" VALUES (286, 11, 'Katni', true);
INSERT INTO public."CityM" VALUES (287, 11, 'Khandwa', true);
INSERT INTO public."CityM" VALUES (288, 11, 'Khargone', true);
INSERT INTO public."CityM" VALUES (289, 11, 'Mandla', true);
INSERT INTO public."CityM" VALUES (290, 11, 'Mandsaur', true);
INSERT INTO public."CityM" VALUES (291, 11, 'Morena', true);
INSERT INTO public."CityM" VALUES (292, 11, 'Narsinghpur', true);
INSERT INTO public."CityM" VALUES (293, 11, 'Neemuch', true);
INSERT INTO public."CityM" VALUES (294, 11, 'Panna', true);
INSERT INTO public."CityM" VALUES (295, 11, 'Rewa', true);
INSERT INTO public."CityM" VALUES (296, 11, 'Rajgarh', true);
INSERT INTO public."CityM" VALUES (297, 11, 'Ratlam', true);
INSERT INTO public."CityM" VALUES (298, 11, 'Raisen', true);
INSERT INTO public."CityM" VALUES (299, 11, 'Sagar', true);
INSERT INTO public."CityM" VALUES (300, 11, 'Satna', true);
INSERT INTO public."CityM" VALUES (301, 11, 'Sehore', true);
INSERT INTO public."CityM" VALUES (302, 11, 'Seoni', true);
INSERT INTO public."CityM" VALUES (303, 11, 'Shahdol', true);
INSERT INTO public."CityM" VALUES (304, 11, 'Shajapur', true);
INSERT INTO public."CityM" VALUES (305, 11, 'Sheopur', true);
INSERT INTO public."CityM" VALUES (306, 11, 'Shivpuri', true);
INSERT INTO public."CityM" VALUES (307, 11, 'Sidhi', true);
INSERT INTO public."CityM" VALUES (308, 11, 'Singrauli', true);
INSERT INTO public."CityM" VALUES (309, 11, 'Tikamgarh', true);
INSERT INTO public."CityM" VALUES (310, 11, 'Ujjain', true);
INSERT INTO public."CityM" VALUES (311, 11, 'Umaria', true);
INSERT INTO public."CityM" VALUES (312, 11, 'Vidisha', true);
INSERT INTO public."CityM" VALUES (313, 12, 'Ahmednagar', true);
INSERT INTO public."CityM" VALUES (314, 12, 'Akola', true);
INSERT INTO public."CityM" VALUES (315, 12, 'Amrawati', true);
INSERT INTO public."CityM" VALUES (316, 12, 'Aurangabad', true);
INSERT INTO public."CityM" VALUES (317, 12, 'Bhandara', true);
INSERT INTO public."CityM" VALUES (318, 12, 'Beed', true);
INSERT INTO public."CityM" VALUES (319, 12, 'Buldhana', true);
INSERT INTO public."CityM" VALUES (320, 12, 'Chandrapur', true);
INSERT INTO public."CityM" VALUES (321, 12, 'Dhule', true);
INSERT INTO public."CityM" VALUES (322, 12, 'Gadchiroli', true);
INSERT INTO public."CityM" VALUES (323, 12, 'Gondiya', true);
INSERT INTO public."CityM" VALUES (324, 12, 'Hingoli', true);
INSERT INTO public."CityM" VALUES (325, 12, 'Jalgaon', true);
INSERT INTO public."CityM" VALUES (326, 12, 'Jalna', true);
INSERT INTO public."CityM" VALUES (327, 12, 'Kolhapur', true);
INSERT INTO public."CityM" VALUES (328, 12, 'Latur', true);
INSERT INTO public."CityM" VALUES (329, 12, 'Mumbai City', true);
INSERT INTO public."CityM" VALUES (330, 12, 'Mumbai suburban', true);
INSERT INTO public."CityM" VALUES (331, 12, 'Nandurbar', true);
INSERT INTO public."CityM" VALUES (332, 12, 'Nanded', true);
INSERT INTO public."CityM" VALUES (333, 12, 'Nagpur', true);
INSERT INTO public."CityM" VALUES (334, 12, 'Nashik', true);
INSERT INTO public."CityM" VALUES (335, 12, 'Osmanabad', true);
INSERT INTO public."CityM" VALUES (336, 12, 'Parbhani', true);
INSERT INTO public."CityM" VALUES (337, 12, 'Pune', true);
INSERT INTO public."CityM" VALUES (338, 12, 'Raigad', true);
INSERT INTO public."CityM" VALUES (339, 12, 'Ratnagiri', true);
INSERT INTO public."CityM" VALUES (340, 12, 'Sindhudurg', true);
INSERT INTO public."CityM" VALUES (341, 12, 'Sangli', true);
INSERT INTO public."CityM" VALUES (342, 12, 'Solapur', true);
INSERT INTO public."CityM" VALUES (343, 12, 'Satara', true);
INSERT INTO public."CityM" VALUES (344, 12, 'Thane', true);
INSERT INTO public."CityM" VALUES (345, 12, 'Wardha', true);
INSERT INTO public."CityM" VALUES (346, 12, 'Washim', true);
INSERT INTO public."CityM" VALUES (347, 12, 'Yavatmal', true);
INSERT INTO public."CityM" VALUES (348, 13, 'Bishnupur', true);
INSERT INTO public."CityM" VALUES (349, 13, 'Churachandpur', true);
INSERT INTO public."CityM" VALUES (350, 13, 'Chandel', true);
INSERT INTO public."CityM" VALUES (351, 13, 'Imphal East', true);
INSERT INTO public."CityM" VALUES (352, 13, 'Senapati', true);
INSERT INTO public."CityM" VALUES (353, 13, 'Tamenglong', true);
INSERT INTO public."CityM" VALUES (354, 13, 'Thoubal', true);
INSERT INTO public."CityM" VALUES (355, 13, 'Ukhrul', true);
INSERT INTO public."CityM" VALUES (356, 13, 'Imphal West', true);
INSERT INTO public."CityM" VALUES (357, 14, 'East Garo Hills', true);
INSERT INTO public."CityM" VALUES (358, 14, 'East Khasi Hills', true);
INSERT INTO public."CityM" VALUES (359, 14, 'Jaintia Hills', true);
INSERT INTO public."CityM" VALUES (360, 14, 'Ri-Bhoi', true);
INSERT INTO public."CityM" VALUES (361, 14, 'South Garo Hills', true);
INSERT INTO public."CityM" VALUES (362, 14, 'West Garo Hills', true);
INSERT INTO public."CityM" VALUES (363, 14, 'West Khasi Hills', true);
INSERT INTO public."CityM" VALUES (364, 15, 'Aizawl', true);
INSERT INTO public."CityM" VALUES (365, 15, 'Champhai', true);
INSERT INTO public."CityM" VALUES (366, 15, 'Kolasib', true);
INSERT INTO public."CityM" VALUES (367, 15, 'Lawngtlai', true);
INSERT INTO public."CityM" VALUES (368, 15, 'Lunglei', true);
INSERT INTO public."CityM" VALUES (369, 15, 'Mamit', true);
INSERT INTO public."CityM" VALUES (370, 15, 'Saiha', true);
INSERT INTO public."CityM" VALUES (371, 15, 'Serchhip', true);
INSERT INTO public."CityM" VALUES (372, 16, 'Dimapur', true);
INSERT INTO public."CityM" VALUES (373, 16, 'Kohima', true);
INSERT INTO public."CityM" VALUES (374, 16, 'Mokokchung', true);
INSERT INTO public."CityM" VALUES (375, 16, 'Mon', true);
INSERT INTO public."CityM" VALUES (376, 16, 'Phek', true);
INSERT INTO public."CityM" VALUES (377, 16, 'Tuensang', true);
INSERT INTO public."CityM" VALUES (378, 16, 'Wokha', true);
INSERT INTO public."CityM" VALUES (379, 16, 'Zunheboto', true);
INSERT INTO public."CityM" VALUES (380, 17, 'Angul', true);
INSERT INTO public."CityM" VALUES (381, 17, 'Boudh', true);
INSERT INTO public."CityM" VALUES (382, 17, 'Bhadrak', true);
INSERT INTO public."CityM" VALUES (383, 17, 'Bolangir', true);
INSERT INTO public."CityM" VALUES (384, 17, 'Bargarh', true);
INSERT INTO public."CityM" VALUES (385, 17, 'Baleswar', true);
INSERT INTO public."CityM" VALUES (386, 17, 'Cuttack', true);
INSERT INTO public."CityM" VALUES (387, 17, 'Debagarh', true);
INSERT INTO public."CityM" VALUES (388, 17, 'Dhenkanal', true);
INSERT INTO public."CityM" VALUES (389, 17, 'Ganjam', true);
INSERT INTO public."CityM" VALUES (390, 17, 'Gajapati', true);
INSERT INTO public."CityM" VALUES (391, 17, 'Jharsuguda', true);
INSERT INTO public."CityM" VALUES (392, 17, 'Jajapur', true);
INSERT INTO public."CityM" VALUES (393, 17, 'Jagatsinghpur', true);
INSERT INTO public."CityM" VALUES (394, 17, 'Khordha', true);
INSERT INTO public."CityM" VALUES (395, 17, 'Kendujhar', true);
INSERT INTO public."CityM" VALUES (396, 17, 'Kalahandi', true);
INSERT INTO public."CityM" VALUES (397, 17, 'Kandhamal', true);
INSERT INTO public."CityM" VALUES (398, 17, 'Koraput', true);
INSERT INTO public."CityM" VALUES (399, 17, 'Kendrapara', true);
INSERT INTO public."CityM" VALUES (400, 17, 'Malkangiri', true);
INSERT INTO public."CityM" VALUES (401, 17, 'Mayurbhanj', true);
INSERT INTO public."CityM" VALUES (402, 17, 'Nabarangpur', true);
INSERT INTO public."CityM" VALUES (403, 17, 'Nuapada', true);
INSERT INTO public."CityM" VALUES (404, 17, 'Nayagarh', true);
INSERT INTO public."CityM" VALUES (405, 17, 'Puri', true);
INSERT INTO public."CityM" VALUES (406, 17, 'Rayagada', true);
INSERT INTO public."CityM" VALUES (407, 17, 'Sambalpur', true);
INSERT INTO public."CityM" VALUES (408, 17, 'Subarnapur', true);
INSERT INTO public."CityM" VALUES (409, 17, 'Sundargarh', true);
INSERT INTO public."CityM" VALUES (410, 27, 'Karaikal', true);
INSERT INTO public."CityM" VALUES (411, 27, 'Mahe', true);
INSERT INTO public."CityM" VALUES (412, 27, 'Puducherry', true);
INSERT INTO public."CityM" VALUES (413, 27, 'Yanam', true);
INSERT INTO public."CityM" VALUES (414, 18, 'Amritsar', true);
INSERT INTO public."CityM" VALUES (415, 18, 'Bathinda', true);
INSERT INTO public."CityM" VALUES (416, 18, 'Firozpur', true);
INSERT INTO public."CityM" VALUES (417, 18, 'Faridkot', true);
INSERT INTO public."CityM" VALUES (418, 18, 'Fatehgarh Sahib', true);
INSERT INTO public."CityM" VALUES (419, 18, 'Gurdaspur', true);
INSERT INTO public."CityM" VALUES (420, 18, 'Hoshiarpur', true);
INSERT INTO public."CityM" VALUES (421, 18, 'Jalandhar', true);
INSERT INTO public."CityM" VALUES (422, 18, 'Kapurthala', true);
INSERT INTO public."CityM" VALUES (423, 18, 'Ludhiana', true);
INSERT INTO public."CityM" VALUES (424, 18, 'Mansa', true);
INSERT INTO public."CityM" VALUES (425, 18, 'Moga', true);
INSERT INTO public."CityM" VALUES (426, 18, 'Mukatsar', true);
INSERT INTO public."CityM" VALUES (427, 18, 'Nawan Shehar', true);
INSERT INTO public."CityM" VALUES (428, 18, 'Patiala', true);
INSERT INTO public."CityM" VALUES (429, 18, 'Rupnagar', true);
INSERT INTO public."CityM" VALUES (430, 18, 'Sangrur', true);
INSERT INTO public."CityM" VALUES (431, 19, 'Ajmer', true);
INSERT INTO public."CityM" VALUES (432, 19, 'Alwar', true);
INSERT INTO public."CityM" VALUES (433, 19, 'Bikaner', true);
INSERT INTO public."CityM" VALUES (434, 19, 'Barmer', true);
INSERT INTO public."CityM" VALUES (435, 19, 'Banswara', true);
INSERT INTO public."CityM" VALUES (436, 19, 'Bharatpur', true);
INSERT INTO public."CityM" VALUES (437, 19, 'Baran', true);
INSERT INTO public."CityM" VALUES (438, 19, 'Bundi', true);
INSERT INTO public."CityM" VALUES (439, 19, 'Bhilwara', true);
INSERT INTO public."CityM" VALUES (440, 19, 'Churu', true);
INSERT INTO public."CityM" VALUES (441, 19, 'Chittorgarh', true);
INSERT INTO public."CityM" VALUES (442, 19, 'Dausa', true);
INSERT INTO public."CityM" VALUES (443, 19, 'Dholpur', true);
INSERT INTO public."CityM" VALUES (444, 19, 'Dungapur', true);
INSERT INTO public."CityM" VALUES (445, 19, 'Ganganagar', true);
INSERT INTO public."CityM" VALUES (446, 19, 'Hanumangarh', true);
INSERT INTO public."CityM" VALUES (447, 19, 'Juhnjhunun', true);
INSERT INTO public."CityM" VALUES (448, 19, 'Jalore', true);
INSERT INTO public."CityM" VALUES (449, 19, 'Jodhpur', true);
INSERT INTO public."CityM" VALUES (450, 19, 'Jaipur', true);
INSERT INTO public."CityM" VALUES (451, 19, 'Jaisalmer', true);
INSERT INTO public."CityM" VALUES (452, 19, 'Jhalawar', true);
INSERT INTO public."CityM" VALUES (453, 19, 'Karauli', true);
INSERT INTO public."CityM" VALUES (454, 19, 'Kota', true);
INSERT INTO public."CityM" VALUES (455, 19, 'Nagaur', true);
INSERT INTO public."CityM" VALUES (456, 19, 'Pali', true);
INSERT INTO public."CityM" VALUES (457, 19, 'Pratapgarh', true);
INSERT INTO public."CityM" VALUES (458, 19, 'Rajsamand', true);
INSERT INTO public."CityM" VALUES (459, 19, 'Sikar', true);
INSERT INTO public."CityM" VALUES (460, 19, 'Sawai Madhopur', true);
INSERT INTO public."CityM" VALUES (461, 19, 'Sirohi', true);
INSERT INTO public."CityM" VALUES (462, 19, 'Tonk', true);
INSERT INTO public."CityM" VALUES (463, 19, 'Udaipur', true);
INSERT INTO public."CityM" VALUES (464, 20, 'East Sikkim', true);
INSERT INTO public."CityM" VALUES (465, 20, 'North Sikkim', true);
INSERT INTO public."CityM" VALUES (466, 20, 'South Sikkim', true);
INSERT INTO public."CityM" VALUES (467, 20, 'West Sikkim', true);
INSERT INTO public."CityM" VALUES (468, 21, 'Ariyalur', true);
INSERT INTO public."CityM" VALUES (469, 21, 'Chennai', true);
INSERT INTO public."CityM" VALUES (470, 21, 'Coimbatore', true);
INSERT INTO public."CityM" VALUES (471, 21, 'Cuddalore', true);
INSERT INTO public."CityM" VALUES (472, 21, 'Dharmapuri', true);
INSERT INTO public."CityM" VALUES (473, 21, 'Dindigul', true);
INSERT INTO public."CityM" VALUES (474, 21, 'Erode', true);
INSERT INTO public."CityM" VALUES (475, 21, 'Kanchipuram', true);
INSERT INTO public."CityM" VALUES (476, 21, 'Kanyakumari', true);
INSERT INTO public."CityM" VALUES (477, 21, 'Karur', true);
INSERT INTO public."CityM" VALUES (478, 21, 'Madurai', true);
INSERT INTO public."CityM" VALUES (479, 21, 'Nagapattinam', true);
INSERT INTO public."CityM" VALUES (480, 21, 'The Nilgiris', true);
INSERT INTO public."CityM" VALUES (481, 21, 'Namakkal', true);
INSERT INTO public."CityM" VALUES (482, 21, 'Perambalur', true);
INSERT INTO public."CityM" VALUES (483, 21, 'Pudukkottai', true);
INSERT INTO public."CityM" VALUES (484, 21, 'Ramanathapuram', true);
INSERT INTO public."CityM" VALUES (485, 21, 'Salem', true);
INSERT INTO public."CityM" VALUES (486, 21, 'Sivagangai', true);
INSERT INTO public."CityM" VALUES (487, 21, 'Tiruppur', true);
INSERT INTO public."CityM" VALUES (488, 21, 'Tiruchirappalli', true);
INSERT INTO public."CityM" VALUES (489, 21, 'Theni', true);
INSERT INTO public."CityM" VALUES (490, 21, 'Tirunelveli', true);
INSERT INTO public."CityM" VALUES (491, 21, 'Thanjavur', true);
INSERT INTO public."CityM" VALUES (492, 21, 'Thoothukudi', true);
INSERT INTO public."CityM" VALUES (493, 21, 'Thiruvallur', true);
INSERT INTO public."CityM" VALUES (494, 21, 'Thiruvarur', true);
INSERT INTO public."CityM" VALUES (495, 21, 'Tiruvannamalai', true);
INSERT INTO public."CityM" VALUES (496, 21, 'Vellore', true);
INSERT INTO public."CityM" VALUES (497, 21, 'Villupuram', true);
INSERT INTO public."CityM" VALUES (498, 22, 'Dhalai', true);
INSERT INTO public."CityM" VALUES (499, 22, 'North Tripura', true);
INSERT INTO public."CityM" VALUES (500, 22, 'South Tripura', true);
INSERT INTO public."CityM" VALUES (501, 22, 'West Tripura', true);
INSERT INTO public."CityM" VALUES (502, 33, 'Almora', true);
INSERT INTO public."CityM" VALUES (503, 33, 'Bageshwar', true);
INSERT INTO public."CityM" VALUES (504, 33, 'Chamoli', true);
INSERT INTO public."CityM" VALUES (505, 33, 'Champawat', true);
INSERT INTO public."CityM" VALUES (506, 33, 'Dehradun', true);
INSERT INTO public."CityM" VALUES (507, 33, 'Haridwar', true);
INSERT INTO public."CityM" VALUES (508, 33, 'Nainital', true);
INSERT INTO public."CityM" VALUES (509, 33, 'Pauri Garhwal', true);
INSERT INTO public."CityM" VALUES (510, 33, 'Pithoragharh', true);
INSERT INTO public."CityM" VALUES (511, 33, 'Rudraprayag', true);
INSERT INTO public."CityM" VALUES (512, 33, 'Tehri Garhwal', true);
INSERT INTO public."CityM" VALUES (513, 33, 'Udham Singh Nagar', true);
INSERT INTO public."CityM" VALUES (514, 33, 'Uttarkashi', true);
INSERT INTO public."CityM" VALUES (515, 23, 'Agra', true);
INSERT INTO public."CityM" VALUES (516, 23, 'Allahabad', true);
INSERT INTO public."CityM" VALUES (517, 23, 'Aligarh', true);
INSERT INTO public."CityM" VALUES (518, 23, 'Ambedkar Nagar', true);
INSERT INTO public."CityM" VALUES (519, 23, 'Auraiya', true);
INSERT INTO public."CityM" VALUES (520, 23, 'Azamgarh', true);
INSERT INTO public."CityM" VALUES (521, 23, 'Barabanki', true);
INSERT INTO public."CityM" VALUES (522, 23, 'Badaun', true);
INSERT INTO public."CityM" VALUES (523, 23, 'Bagpat', true);
INSERT INTO public."CityM" VALUES (524, 23, 'Bahraich', true);
INSERT INTO public."CityM" VALUES (525, 23, 'Bijnor', true);
INSERT INTO public."CityM" VALUES (526, 23, 'Ballia', true);
INSERT INTO public."CityM" VALUES (527, 23, 'Banda', true);
INSERT INTO public."CityM" VALUES (528, 23, 'Balrampur', true);
INSERT INTO public."CityM" VALUES (529, 23, 'Bareilly', true);
INSERT INTO public."CityM" VALUES (530, 23, 'Basti', true);
INSERT INTO public."CityM" VALUES (531, 23, 'Bulandshahr', true);
INSERT INTO public."CityM" VALUES (532, 23, 'Chandauli', true);
INSERT INTO public."CityM" VALUES (533, 23, 'Chitrakoot', true);
INSERT INTO public."CityM" VALUES (534, 23, 'Deoria', true);
INSERT INTO public."CityM" VALUES (535, 23, 'Etah', true);
INSERT INTO public."CityM" VALUES (536, 23, 'Kanshiram Nagar', true);
INSERT INTO public."CityM" VALUES (537, 23, 'Etawah', true);
INSERT INTO public."CityM" VALUES (538, 23, 'Firozabad', true);
INSERT INTO public."CityM" VALUES (539, 23, 'Farrukhabad', true);
INSERT INTO public."CityM" VALUES (540, 23, 'Fatehpur', true);
INSERT INTO public."CityM" VALUES (541, 23, 'Faizabad', true);
INSERT INTO public."CityM" VALUES (542, 23, 'Gautam Buddha Nagar', true);
INSERT INTO public."CityM" VALUES (543, 23, 'Gonda', true);
INSERT INTO public."CityM" VALUES (544, 23, 'Ghazipur', true);
INSERT INTO public."CityM" VALUES (545, 23, 'Gorkakhpur', true);
INSERT INTO public."CityM" VALUES (546, 23, 'Ghaziabad', true);
INSERT INTO public."CityM" VALUES (547, 23, 'Hamirpur', true);
INSERT INTO public."CityM" VALUES (548, 23, 'Hardoi', true);
INSERT INTO public."CityM" VALUES (549, 23, 'Mahamaya Nagar', true);
INSERT INTO public."CityM" VALUES (550, 23, 'Jhansi', true);
INSERT INTO public."CityM" VALUES (551, 23, 'Jalaun', true);
INSERT INTO public."CityM" VALUES (552, 23, 'Jyotiba Phule Nagar', true);
INSERT INTO public."CityM" VALUES (553, 23, 'Jaunpur District', true);
INSERT INTO public."CityM" VALUES (554, 23, 'Kanpur Dehat', true);
INSERT INTO public."CityM" VALUES (555, 23, 'Kannauj', true);
INSERT INTO public."CityM" VALUES (556, 23, 'Kanpur Nagar', true);
INSERT INTO public."CityM" VALUES (557, 23, 'Kaushambi', true);
INSERT INTO public."CityM" VALUES (558, 23, 'Kushinagar', true);
INSERT INTO public."CityM" VALUES (559, 23, 'Lalitpur', true);
INSERT INTO public."CityM" VALUES (560, 23, 'Lakhimpur Kheri', true);
INSERT INTO public."CityM" VALUES (561, 23, 'Lucknow', true);
INSERT INTO public."CityM" VALUES (562, 23, 'Mau', true);
INSERT INTO public."CityM" VALUES (563, 23, 'Meerut', true);
INSERT INTO public."CityM" VALUES (564, 23, 'Maharajganj', true);
INSERT INTO public."CityM" VALUES (565, 23, 'Mahoba', true);
INSERT INTO public."CityM" VALUES (566, 23, 'Mirzapur', true);
INSERT INTO public."CityM" VALUES (567, 23, 'Moradabad', true);
INSERT INTO public."CityM" VALUES (568, 23, 'Mainpuri', true);
INSERT INTO public."CityM" VALUES (569, 23, 'Mathura', true);
INSERT INTO public."CityM" VALUES (570, 23, 'Muzaffarnagar', true);
INSERT INTO public."CityM" VALUES (571, 23, 'Pilibhit', true);
INSERT INTO public."CityM" VALUES (572, 23, 'Pratapgarh', true);
INSERT INTO public."CityM" VALUES (573, 23, 'Rampur', true);
INSERT INTO public."CityM" VALUES (574, 23, 'Rae Bareli', true);
INSERT INTO public."CityM" VALUES (575, 23, 'Saharanpur', true);
INSERT INTO public."CityM" VALUES (576, 23, 'Sitapur', true);
INSERT INTO public."CityM" VALUES (577, 23, 'Shahjahanpur', true);
INSERT INTO public."CityM" VALUES (578, 23, 'Sant Kabir Nagar', true);
INSERT INTO public."CityM" VALUES (579, 23, 'Siddharthnagar', true);
INSERT INTO public."CityM" VALUES (580, 23, 'Sonbhadra', true);
INSERT INTO public."CityM" VALUES (581, 23, 'Sant Ravidas Nagar', true);
INSERT INTO public."CityM" VALUES (582, 23, 'Sultanpur', true);
INSERT INTO public."CityM" VALUES (583, 23, 'Shravasti', true);
INSERT INTO public."CityM" VALUES (584, 23, 'Unnao', true);
INSERT INTO public."CityM" VALUES (585, 23, 'Varanasi', true);
INSERT INTO public."CityM" VALUES (586, 24, 'Birbhum', true);
INSERT INTO public."CityM" VALUES (587, 24, 'Bankura', true);
INSERT INTO public."CityM" VALUES (588, 24, 'Bardhaman', true);
INSERT INTO public."CityM" VALUES (589, 24, 'Darjeeling', true);
INSERT INTO public."CityM" VALUES (590, 24, 'Dakshin Dinajpur', true);
INSERT INTO public."CityM" VALUES (591, 24, 'Hooghly', true);
INSERT INTO public."CityM" VALUES (592, 24, 'Howrah', true);
INSERT INTO public."CityM" VALUES (593, 24, 'Jalpaiguri', true);
INSERT INTO public."CityM" VALUES (594, 24, 'Cooch Behar', true);
INSERT INTO public."CityM" VALUES (595, 24, 'Kolkata', true);
INSERT INTO public."CityM" VALUES (596, 24, 'Malda', true);
INSERT INTO public."CityM" VALUES (597, 24, 'Midnapore', true);
INSERT INTO public."CityM" VALUES (598, 24, 'Murshidabad', true);
INSERT INTO public."CityM" VALUES (599, 24, 'Nadia', true);
INSERT INTO public."CityM" VALUES (600, 24, 'North 24 Parganas', true);
INSERT INTO public."CityM" VALUES (601, 24, 'South 24 Parganas', true);
INSERT INTO public."CityM" VALUES (602, 24, 'Purulia', true);
INSERT INTO public."CityM" VALUES (603, 24, 'Uttar Dinajpur', true);


--
-- Data for Name: CustomerM; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: DateTypeD; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: DateTypeM; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: DepartmentM; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: Enquiry; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: EventTypeM; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: GlobalSettings; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: HallM; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: MenuItemM; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: MenuM; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: Notes; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: StateM; Type: TABLE DATA; Schema: public; Owner: webadmin
--

INSERT INTO public."StateM" VALUES (1, 'ANDHRA PRADESH', NULL, true, 0);
INSERT INTO public."StateM" VALUES (2, 'ASSAM', NULL, true, 0);
INSERT INTO public."StateM" VALUES (3, 'ARUNACHAL PRADESH', NULL, true, 0);
INSERT INTO public."StateM" VALUES (4, 'BIHAR', NULL, true, 0);
INSERT INTO public."StateM" VALUES (5, 'GUJRAT', NULL, true, 0);
INSERT INTO public."StateM" VALUES (6, 'HARYANA', NULL, true, 0);
INSERT INTO public."StateM" VALUES (7, 'HIMACHAL PRADESH', NULL, true, 0);
INSERT INTO public."StateM" VALUES (8, 'JAMMU & KASHMIR', NULL, true, 0);
INSERT INTO public."StateM" VALUES (9, 'KARNATAKA', NULL, true, 0);
INSERT INTO public."StateM" VALUES (10, 'KERALA', NULL, true, 0);
INSERT INTO public."StateM" VALUES (11, 'MADHYA PRADESH', NULL, true, 0);
INSERT INTO public."StateM" VALUES (12, 'MAHARASHTRA', NULL, true, 0);
INSERT INTO public."StateM" VALUES (13, 'MANIPUR', NULL, true, 0);
INSERT INTO public."StateM" VALUES (14, 'MEGHALAYA', NULL, true, 0);
INSERT INTO public."StateM" VALUES (15, 'MIZORAM', NULL, true, 0);
INSERT INTO public."StateM" VALUES (16, 'NAGALAND', NULL, true, 0);
INSERT INTO public."StateM" VALUES (17, 'ORISSA', NULL, true, 0);
INSERT INTO public."StateM" VALUES (18, 'PUNJAB', NULL, true, 0);
INSERT INTO public."StateM" VALUES (19, 'RAJASTHAN', NULL, true, 0);
INSERT INTO public."StateM" VALUES (20, 'SIKKIM', NULL, true, 0);
INSERT INTO public."StateM" VALUES (21, 'TAMIL NADU', NULL, true, 0);
INSERT INTO public."StateM" VALUES (22, 'TRIPURA', NULL, true, 0);
INSERT INTO public."StateM" VALUES (23, 'UTTAR PRADESH', NULL, true, 0);
INSERT INTO public."StateM" VALUES (24, 'WEST BENGAL', NULL, true, 0);
INSERT INTO public."StateM" VALUES (25, 'DELHI', NULL, true, 0);
INSERT INTO public."StateM" VALUES (26, 'GOA', NULL, true, 0);
INSERT INTO public."StateM" VALUES (27, 'PONDICHERY', NULL, true, 0);
INSERT INTO public."StateM" VALUES (28, 'LAKSHDWEEP', NULL, true, 0);
INSERT INTO public."StateM" VALUES (29, 'DAMAN & DIU', NULL, true, 0);
INSERT INTO public."StateM" VALUES (30, 'DADRA & NAGAR', NULL, true, 0);
INSERT INTO public."StateM" VALUES (31, 'CHANDIGARH', NULL, true, 0);
INSERT INTO public."StateM" VALUES (32, 'ANDAMAN & NICOBAR', NULL, true, 0);
INSERT INTO public."StateM" VALUES (33, 'UTTARANCHAL', NULL, true, 0);
INSERT INTO public."StateM" VALUES (34, 'JHARKHAND', NULL, true, 0);
INSERT INTO public."StateM" VALUES (35, 'CHATTISGARH', NULL, true, 0);


--
-- Data for Name: TableIdCounter; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: TimeSlotM; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Data for Name: UnitM; Type: TABLE DATA; Schema: public; Owner: webadmin
--



--
-- Name: BookingAction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."BookingAction_id_seq"', 1, false);


--
-- Name: BookingBill_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."BookingBill_id_seq"', 1, false);


--
-- Name: BookingHallFoodItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."BookingHallFoodItem_id_seq"', 1, false);


--
-- Name: BookingHall_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."BookingHall_id_seq"', 1, false);


--
-- Name: BookingLog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."BookingLog_id_seq"', 1, false);


--
-- Name: BookingMain_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."BookingMain_id_seq"', 1, false);


--
-- Name: BookingNoCounter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."BookingNoCounter_id_seq"', 1, false);


--
-- Name: BookingReceipt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."BookingReceipt_id_seq"', 1, false);


--
-- Name: CustomerM_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."CustomerM_id_seq"', 1, false);


--
-- Name: DateTypeD_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."DateTypeD_id_seq"', 1, false);


--
-- Name: DepartmentM_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."DepartmentM_id_seq"', 1, false);


--
-- Name: Enquiry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."Enquiry_id_seq"', 1, false);


--
-- Name: MenuItemM_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."MenuItemM_id_seq"', 1, false);


--
-- Name: MenuM_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."MenuM_id_seq"', 1, false);


--
-- Name: Notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."Notes_id_seq"', 1, false);


--
-- Name: TableIdCounter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: webadmin
--

SELECT pg_catalog.setval('public."TableIdCounter_id_seq"', 1, false);


--
-- Name: BookingActionM BookingActionM_actionName_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingActionM"
    ADD CONSTRAINT "BookingActionM_actionName_key" UNIQUE ("actionName");


--
-- Name: BookingActionM BookingActionM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingActionM"
    ADD CONSTRAINT "BookingActionM_pkey" PRIMARY KEY (id);


--
-- Name: BookingActionD BookingAction_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingActionD"
    ADD CONSTRAINT "BookingAction_pkey" PRIMARY KEY (id);


--
-- Name: BookingBill BookingBill_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingBill"
    ADD CONSTRAINT "BookingBill_pkey" PRIMARY KEY (id);


--
-- Name: BookingHallMenuItemX BookingHallMenuItemX_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingHallMenuItemX"
    ADD CONSTRAINT "BookingHallMenuItemX_pkey" PRIMARY KEY (id);


--
-- Name: BookingHall BookingHall_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingHall"
    ADD CONSTRAINT "BookingHall_pkey" PRIMARY KEY (id);


--
-- Name: BookingLog BookingLog_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingLog"
    ADD CONSTRAINT "BookingLog_pkey" PRIMARY KEY (id);


--
-- Name: BookingMain BookingMain_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingMain"
    ADD CONSTRAINT "BookingMain_pkey" PRIMARY KEY (id);


--
-- Name: BookingNoCounter BookingNoCounter_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingNoCounter"
    ADD CONSTRAINT "BookingNoCounter_pkey" PRIMARY KEY (id);


--
-- Name: BookingReceipt BookingReceipt_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingReceipt"
    ADD CONSTRAINT "BookingReceipt_pkey" PRIMARY KEY ("bookingMainId");


--
-- Name: BookingStatusM BookingStatusM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingStatusM"
    ADD CONSTRAINT "BookingStatusM_pkey" PRIMARY KEY (id);


--
-- Name: BookingStatusM BookingStatusM_statusName_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingStatusM"
    ADD CONSTRAINT "BookingStatusM_statusName_key" UNIQUE ("statusName");


--
-- Name: BranchM BranchM_branchName_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BranchM"
    ADD CONSTRAINT "BranchM_branchName_key" UNIQUE ("branchName");


--
-- Name: BranchM BranchM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BranchM"
    ADD CONSTRAINT "BranchM_pkey" PRIMARY KEY (id);


--
-- Name: BranchM BranchM_shortCode_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BranchM"
    ADD CONSTRAINT "BranchM_shortCode_key" UNIQUE ("shortCode");


--
-- Name: BranchSettings BranchSettings_key_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BranchSettings"
    ADD CONSTRAINT "BranchSettings_key_key" UNIQUE (key);


--
-- Name: BranchSettings BranchSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BranchSettings"
    ADD CONSTRAINT "BranchSettings_pkey" PRIMARY KEY (id);


--
-- Name: CityM CityM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."CityM"
    ADD CONSTRAINT "CityM_pkey" PRIMARY KEY (id);


--
-- Name: CustomerM CustomerM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."CustomerM"
    ADD CONSTRAINT "CustomerM_pkey" PRIMARY KEY (id);


--
-- Name: DateTypeD DateTypeD_mdate_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."DateTypeD"
    ADD CONSTRAINT "DateTypeD_mdate_key" UNIQUE (mdate);


--
-- Name: DateTypeD DateTypeD_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."DateTypeD"
    ADD CONSTRAINT "DateTypeD_pkey" PRIMARY KEY (id);


--
-- Name: DateTypeM DateTypeM_dateTypeName_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."DateTypeM"
    ADD CONSTRAINT "DateTypeM_dateTypeName_key" UNIQUE ("dateTypeName");


--
-- Name: DateTypeM DateTypeM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."DateTypeM"
    ADD CONSTRAINT "DateTypeM_pkey" PRIMARY KEY (id);


--
-- Name: DepartmentM DepartmentM_branchId_depName_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."DepartmentM"
    ADD CONSTRAINT "DepartmentM_branchId_depName_key" UNIQUE ("branchId", "depName");


--
-- Name: DepartmentM DepartmentM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."DepartmentM"
    ADD CONSTRAINT "DepartmentM_pkey" PRIMARY KEY (id);


--
-- Name: Enquiry Enquiry_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."Enquiry"
    ADD CONSTRAINT "Enquiry_pkey" PRIMARY KEY (id);


--
-- Name: EventTypeM EventTypeM_eventTypeName_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."EventTypeM"
    ADD CONSTRAINT "EventTypeM_eventTypeName_key" UNIQUE ("eventTypeName");


--
-- Name: EventTypeM EventTypeM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."EventTypeM"
    ADD CONSTRAINT "EventTypeM_pkey" PRIMARY KEY (id);


--
-- Name: GlobalSettings GlobalSettings_key_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."GlobalSettings"
    ADD CONSTRAINT "GlobalSettings_key_key" UNIQUE (key);


--
-- Name: GlobalSettings GlobalSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."GlobalSettings"
    ADD CONSTRAINT "GlobalSettings_pkey" PRIMARY KEY (id);


--
-- Name: HallM HallM_hallName_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."HallM"
    ADD CONSTRAINT "HallM_hallName_key" UNIQUE ("hallName");


--
-- Name: HallM HallM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."HallM"
    ADD CONSTRAINT "HallM_pkey" PRIMARY KEY (id);


--
-- Name: MenuItemM MenuItemM_menuItemName_menuId_departmentId_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."MenuItemM"
    ADD CONSTRAINT "MenuItemM_menuItemName_menuId_departmentId_key" UNIQUE ("menuItemName", "menuId", "departmentId");


--
-- Name: MenuItemM MenuItemM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."MenuItemM"
    ADD CONSTRAINT "MenuItemM_pkey" PRIMARY KEY (id);


--
-- Name: MenuM MenuM_menuName_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."MenuM"
    ADD CONSTRAINT "MenuM_menuName_key" UNIQUE ("menuName");


--
-- Name: MenuM MenuM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."MenuM"
    ADD CONSTRAINT "MenuM_pkey" PRIMARY KEY (id);


--
-- Name: Notes Notes_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."Notes"
    ADD CONSTRAINT "Notes_pkey" PRIMARY KEY (id);


--
-- Name: StateM StateM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."StateM"
    ADD CONSTRAINT "StateM_pkey" PRIMARY KEY (id);


--
-- Name: StateM StateM_stateCode_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."StateM"
    ADD CONSTRAINT "StateM_stateCode_key" UNIQUE ("stateCode");


--
-- Name: StateM StateM_stateName_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."StateM"
    ADD CONSTRAINT "StateM_stateName_key" UNIQUE ("stateName");


--
-- Name: TableIdCounter TableIdCounter_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."TableIdCounter"
    ADD CONSTRAINT "TableIdCounter_pkey" PRIMARY KEY (id);


--
-- Name: TableIdCounter TableIdCounter_tableName_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."TableIdCounter"
    ADD CONSTRAINT "TableIdCounter_tableName_key" UNIQUE ("tableName");


--
-- Name: TimeSlotM TimeSlotM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."TimeSlotM"
    ADD CONSTRAINT "TimeSlotM_pkey" PRIMARY KEY (id);


--
-- Name: TimeSlotM TimeSlotM_timeSlotName_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."TimeSlotM"
    ADD CONSTRAINT "TimeSlotM_timeSlotName_key" UNIQUE ("timeSlotName");


--
-- Name: UnitM UnitM_pkey; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."UnitM"
    ADD CONSTRAINT "UnitM_pkey" PRIMARY KEY (id);


--
-- Name: UnitM UnitM_symbol_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."UnitM"
    ADD CONSTRAINT "UnitM_symbol_key" UNIQUE (symbol);


--
-- Name: UnitM UnitM_unitName_key; Type: CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."UnitM"
    ADD CONSTRAINT "UnitM_unitName_key" UNIQUE ("unitName");


--
-- Name: BookingActionD BookingAction_bookingActionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingActionD"
    ADD CONSTRAINT "BookingAction_bookingActionId_fkey" FOREIGN KEY ("bookingActionId") REFERENCES public."BookingActionM"(id);


--
-- Name: BookingActionD BookingAction_bookingStatusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingActionD"
    ADD CONSTRAINT "BookingAction_bookingStatusId_fkey" FOREIGN KEY ("bookingStatusId") REFERENCES public."BookingStatusM"(id);


--
-- Name: BookingBill BookingBill_bookingMainId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingBill"
    ADD CONSTRAINT "BookingBill_bookingMainId_fkey" FOREIGN KEY ("bookingMainId") REFERENCES public."BookingMain"(id);


--
-- Name: BookingHallMenuItemX BookingHallMenuItemX_bookingHallId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingHallMenuItemX"
    ADD CONSTRAINT "BookingHallMenuItemX_bookingHallId_fkey" FOREIGN KEY ("bookingHallId") REFERENCES public."BookingHall"(id) NOT VALID;


--
-- Name: BookingHallMenuItemX BookingHallMenuItemX_departmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingHallMenuItemX"
    ADD CONSTRAINT "BookingHallMenuItemX_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES public."DepartmentM"(id) NOT VALID;


--
-- Name: BookingHallMenuItemX BookingHallMenuItemX_menuItemId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingHallMenuItemX"
    ADD CONSTRAINT "BookingHallMenuItemX_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES public."MenuItemM"(id) NOT VALID;


--
-- Name: BookingHall BookingHall_bookingMainId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingHall"
    ADD CONSTRAINT "BookingHall_bookingMainId_fkey" FOREIGN KEY ("bookingMainId") REFERENCES public."BookingMain"(id);


--
-- Name: BookingHall BookingHall_eventTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingHall"
    ADD CONSTRAINT "BookingHall_eventTypeId_fkey" FOREIGN KEY ("eventTypeId") REFERENCES public."EventTypeM"(id);


--
-- Name: BookingHall BookingHall_hallId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingHall"
    ADD CONSTRAINT "BookingHall_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES public."HallM"(id);


--
-- Name: BookingHall BookingHall_menuId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingHall"
    ADD CONSTRAINT "BookingHall_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES public."MenuM"(id);


--
-- Name: BookingHall BookingHall_timeSlotId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingHall"
    ADD CONSTRAINT "BookingHall_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES public."TimeSlotM"(id);


--
-- Name: BookingLog BookingLog_bookingMainId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingLog"
    ADD CONSTRAINT "BookingLog_bookingMainId_fkey" FOREIGN KEY ("bookingMainId") REFERENCES public."BookingMain"(id);


--
-- Name: BookingMain BookingMain_currentStatusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingMain"
    ADD CONSTRAINT "BookingMain_currentStatusId_fkey" FOREIGN KEY ("currentStatusId") REFERENCES public."BookingStatusM"(id);


--
-- Name: BookingMain BookingMain_custGuaranterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingMain"
    ADD CONSTRAINT "BookingMain_custGuaranterId_fkey" FOREIGN KEY ("custGuaranterId") REFERENCES public."CustomerM"(id);


--
-- Name: BookingMain BookingMain_custId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingMain"
    ADD CONSTRAINT "BookingMain_custId_fkey" FOREIGN KEY ("custId") REFERENCES public."CustomerM"(id);


--
-- Name: BookingMain BookingMain_custReferenceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingMain"
    ADD CONSTRAINT "BookingMain_custReferenceId_fkey" FOREIGN KEY ("custReferenceId") REFERENCES public."CustomerM"(id);


--
-- Name: BookingMain BookingMain_custRelationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingMain"
    ADD CONSTRAINT "BookingMain_custRelationId_fkey" FOREIGN KEY ("custRelationId") REFERENCES public."CustomerM"(id);


--
-- Name: BookingNoCounter BookingNoCounter_branchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingNoCounter"
    ADD CONSTRAINT "BookingNoCounter_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public."BranchM"(id);


--
-- Name: BookingReceipt BookingReceipt_bookingMainId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BookingReceipt"
    ADD CONSTRAINT "BookingReceipt_bookingMainId_fkey" FOREIGN KEY ("bookingMainId") REFERENCES public."BookingMain"(id);


--
-- Name: BranchSettings BranchSettings_branchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."BranchSettings"
    ADD CONSTRAINT "BranchSettings_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public."BranchM"(id) NOT VALID;


--
-- Name: CityM CityM_stateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."CityM"
    ADD CONSTRAINT "CityM_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES public."StateM"(id) NOT VALID;


--
-- Name: CustomerM CustomerM_cityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."CustomerM"
    ADD CONSTRAINT "CustomerM_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES public."CityM"(id);


--
-- Name: DateTypeD DateTypeD_dateTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."DateTypeD"
    ADD CONSTRAINT "DateTypeD_dateTypeId_fkey" FOREIGN KEY ("dateTypeId") REFERENCES public."DateTypeM"(id);


--
-- Name: DepartmentM DepartmentM_branchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."DepartmentM"
    ADD CONSTRAINT "DepartmentM_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public."BranchM"(id);


--
-- Name: Enquiry Enquiry_hallId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."Enquiry"
    ADD CONSTRAINT "Enquiry_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES public."HallM"(id);


--
-- Name: HallM HallM_branchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."HallM"
    ADD CONSTRAINT "HallM_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES bika."BranchM"(id);


--
-- Name: MenuItemM MenuItemM_menuId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."MenuItemM"
    ADD CONSTRAINT "MenuItemM_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES public."MenuM"(id);


--
-- Name: MenuItemM MenuItemM_unitId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."MenuItemM"
    ADD CONSTRAINT "MenuItemM_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES public."UnitM"(id);


--
-- Name: Notes Notes_branchId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: webadmin
--

ALTER TABLE ONLY public."Notes"
    ADD CONSTRAINT "Notes_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES public."BranchM"(id);


--
-- PostgreSQL database dump complete
--

