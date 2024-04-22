CREATE TRIGGER update_email_in_profiles_trigger AFTER UPDATE OF email ON auth.users FOR EACH ROW EXECUTE FUNCTION update_user_email();


