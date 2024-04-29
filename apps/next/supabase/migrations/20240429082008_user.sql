drop trigger if exists "handle_new_user_trigger" on "auth"."users";

CREATE TRIGGER handle_new_user_trigger AFTER INSERT ON auth.users FOR EACH ROW WHEN ((new.is_anonymous IS FALSE)) EXECUTE FUNCTION handle_new_user();


