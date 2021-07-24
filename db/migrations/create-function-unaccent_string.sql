CREATE EXTENSION unaccent;

CREATE OR REPLACE FUNCTION unaccent_string(text) RETURNS text AS $$
DECLARE
    input_string text := $1;
BEGIN

input_string := translate(input_string, 'âấầẩẫậắẳẵặãäåāăąÁÂÃÄÅĀĂĄ', 'aaaaaaaaaaaaaaaaaaaa'); --check
input_string := translate(input_string, 'èééêëēĕėęěĒĔĖĘĚ', 'eeeeeeeeeeeeeee');
input_string := translate(input_string, 'ìíîïìĩīĭÌÍÎÏÌĨĪĬ', 'iiiiiiiiiiiiiiii');
input_string := translate(input_string, 'óôõöōŏőÒÓÔÕÖŌŎŐ', 'ooooooooooooooo');
input_string := translate(input_string, 'ùúûüũūŭůÙÚÛÜŨŪŬŮ', 'uuuuuuuuuuuuuuuu');

return input_string;
END;
$$ LANGUAGE 'plpgsql';

select
	"Contents"."phrase_id" as "phraseId",
	"Contents"."language_id" as "languageId",
	"Contents"."content",
	"Contents"."created_by" as "createdBy",
	"Contents"."updated_by" as "updatedBy",
	"Contents"."created_at" as "createdAt",
	"Contents"."updated_at" as "updatedAt",
	"phrase"."id" as "phrase.id",
	"phrase"."key" as "phrase.key"
from
	"contents" as "Contents"
inner join "phrases" as "phrase" on
	"Contents"."phrase_id" = "phrase"."id"
	and unaccent("Contents"."content") ilike unaccent('%Nhập%');
	

select
	"Contents"."phrase_id" as "phraseId",
	"Contents"."language_id" as "languageId",
	"Contents"."content",
	"Contents"."created_by" as "createdBy",
	"Contents"."updated_by" as "updatedBy",
	"Contents"."created_at" as "createdAt",
	"Contents"."updated_at" as "updatedAt",
	"phrase"."id" as "phrase.id",
	"phrase"."key" as "phrase.key"
from
	"contents" as "Contents"
inner join "phrases" as "phrase" on
	"Contents"."phrase_id" = "phrase"."id"
	and unaccent_string("content") ilike unaccent_string('%Nhập%')