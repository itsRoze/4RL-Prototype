
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

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."log_type" AS ENUM (
    'login',
    'logout',
    'attempt_match',
    'reveal_answer',
    'reveal_score',
    'accept_match',
    'dismiss_match'
);

ALTER TYPE "public"."log_type" OWNER TO "postgres";

CREATE TYPE "public"."match_status" AS ENUM (
    'pending',
    'accepted'
);

ALTER TYPE "public"."match_status" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."analytic" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "type" "public"."log_type" NOT NULL,
    "user_auth_id" "uuid" NOT NULL,
    "related_user_auth_id" "uuid"
);

ALTER TABLE "public"."analytic" OWNER TO "postgres";

ALTER TABLE "public"."analytic" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."analytic_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."answer" (
    "id" bigint NOT NULL,
    "question_id" bigint NOT NULL,
    "response" "text" NOT NULL,
    "updated_at" timestamp without time zone NOT NULL,
    "auth_id" "uuid" NOT NULL,
    CONSTRAINT "answer_response_check" CHECK (("length"("response") < 300))
);

ALTER TABLE "public"."answer" OWNER TO "postgres";

ALTER TABLE "public"."answer" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."answer_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."match" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "to_user" "uuid",
    "from_user" "uuid",
    "status" "public"."match_status" DEFAULT 'pending'::"public"."match_status" NOT NULL,
    "question_to_show" bigint,
    "matchmaking_score" "text"
);

ALTER TABLE "public"."match" OWNER TO "postgres";

ALTER TABLE "public"."match" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."match_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."profile" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "auth_id" "uuid",
    "completed_questionnaire" boolean DEFAULT false NOT NULL,
    "name" "text",
    CONSTRAINT "profile_name_check" CHECK (("length"("name") < 50))
);

ALTER TABLE "public"."profile" OWNER TO "postgres";

ALTER TABLE "public"."profile" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."profile_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."questionnaire" (
    "id" bigint NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "question" "text" NOT NULL
);

ALTER TABLE "public"."questionnaire" OWNER TO "postgres";

ALTER TABLE "public"."questionnaire" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."questionnaire_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY "public"."analytic"
    ADD CONSTRAINT "analytic_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."answer"
    ADD CONSTRAINT "answer_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."match"
    ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_auth_id_key" UNIQUE ("auth_id");

ALTER TABLE ONLY "public"."answer"
    ADD CONSTRAINT "question_auth_unique" UNIQUE ("question_id", "auth_id");

ALTER TABLE ONLY "public"."questionnaire"
    ADD CONSTRAINT "questionnaire_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "user_info_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."analytic"
    ADD CONSTRAINT "public_analytic_related_user_fkey" FOREIGN KEY ("related_user_auth_id") REFERENCES "public"."profile"("auth_id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."analytic"
    ADD CONSTRAINT "public_analytic_user_fkey" FOREIGN KEY ("user_auth_id") REFERENCES "public"."profile"("auth_id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."answer"
    ADD CONSTRAINT "public_answer_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "public"."profile"("auth_id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."answer"
    ADD CONSTRAINT "public_answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "public"."questionnaire"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."match"
    ADD CONSTRAINT "public_notification_from_user_fkey" FOREIGN KEY ("from_user") REFERENCES "public"."profile"("auth_id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."match"
    ADD CONSTRAINT "public_notification_question_to_show_fkey" FOREIGN KEY ("question_to_show") REFERENCES "public"."questionnaire"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."match"
    ADD CONSTRAINT "public_notification_to_user_fkey" FOREIGN KEY ("to_user") REFERENCES "public"."profile"("auth_id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "public_user_info_auth_id_fkey" FOREIGN KEY ("auth_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Enable ALL for users based on auth_id" ON "public"."answer" USING (("auth"."uid"() = "auth_id")) WITH CHECK (("auth"."uid"() = "auth_id"));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."profile" TO "authenticated" USING (("auth"."uid"() = "auth_id"));

CREATE POLICY "Enable insert for users based on user_auth_id" ON "public"."analytic" USING (("auth"."uid"() = "user_auth_id")) WITH CHECK (("auth"."uid"() = "user_auth_id"));

CREATE POLICY "Enable read access for all users" ON "public"."answer" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."match" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."profile" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."questionnaire" FOR SELECT USING (true);

ALTER TABLE "public"."analytic" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."answer" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."match" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profile" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."questionnaire" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."analytic" TO "anon";
GRANT ALL ON TABLE "public"."analytic" TO "authenticated";
GRANT ALL ON TABLE "public"."analytic" TO "service_role";

GRANT ALL ON SEQUENCE "public"."analytic_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."analytic_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."analytic_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."answer" TO "anon";
GRANT ALL ON TABLE "public"."answer" TO "authenticated";
GRANT ALL ON TABLE "public"."answer" TO "service_role";

GRANT ALL ON SEQUENCE "public"."answer_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."answer_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."answer_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."match" TO "anon";
GRANT ALL ON TABLE "public"."match" TO "authenticated";
GRANT ALL ON TABLE "public"."match" TO "service_role";

GRANT ALL ON SEQUENCE "public"."match_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."match_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."match_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."profile" TO "anon";
GRANT ALL ON TABLE "public"."profile" TO "authenticated";
GRANT ALL ON TABLE "public"."profile" TO "service_role";

GRANT ALL ON SEQUENCE "public"."profile_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."profile_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."profile_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."questionnaire" TO "anon";
GRANT ALL ON TABLE "public"."questionnaire" TO "authenticated";
GRANT ALL ON TABLE "public"."questionnaire" TO "service_role";

GRANT ALL ON SEQUENCE "public"."questionnaire_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."questionnaire_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."questionnaire_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;

--
-- Dumped schema changes for auth and storage
--

