drop trigger if exists "update_email_in_profiles_trigger" on "auth"."users";

CREATE TRIGGER handle_user_becomes_permanent_trigger AFTER UPDATE OF email ON auth.users FOR EACH ROW WHEN (((old.email IS null) AND (new.email IS not null))) EXECUTE FUNCTION handle_new_user();

CREATE TRIGGER update_email_in_profiles_trigger AFTER UPDATE OF email ON auth.users FOR EACH ROW WHEN ((old.is_anonymous IS FALSE)) EXECUTE FUNCTION update_user_email();


