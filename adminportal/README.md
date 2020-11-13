# Hutch FE Test - John Grimsey

## Notes

I spent about two hours I think, apologies time ran away with me.
This is very rough and I could have made it prettier and more secure. I didn't put any effort in to ensuring all fonts etc were consistent. I chose to focus on logic.

### Search

I ran out of time. Plan would be to have matching user records displayed in a dropdown just like Google. Then clicking a result or hitting enter would then take you to that user record at `/user`.
The template logic isn't scalable. I would use a iterate over an array containing data to configure search types.

### Dashboard 

I'd add helpful icons to admin section links. I'd also then mirror those section links in a menu in the navbar.

### `UserComponent`

This form would be broken down into one component per section rather than showing/hiding sections of the form.
Allowing for correct better performance and clearer testing.

### `EnvInfoComponent`

Would trigger a reload of data when user changes API or data version.
API/data versions are persisted via `LocalStorage`.

### Auth via JWT

For signing of API requests with JWT, and handling of expired/invalid tokens please see `app/interceptors/auth.interceptor.ts`. 
JWT is persisted via `LocalStorage`.

### API / Data Version

Please see `app/interceptors/version.interceptor.ts`. This would need logic to ensure only relevant API paths receive api/version HTTP headers.

### API Error handling

Rather than handling errors for each API call I built a global handler setup using `ApiService` and `ApiErrorService`. Centralised error handling can often be better for handling global errors.
