set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_user_email()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  UPDATE public.profiles 
  SET email = NEW.email
  WHERE id = NEW.id;

  RETURN NEW;
END;$function$
;


