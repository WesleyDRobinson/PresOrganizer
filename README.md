__What we built!__

Our recorded demo: https://vimeo.com/129610295

A tool for uploading and managing presentation media. This version is specifically aimed at PechaKucha events where presenters agree to presentation constraints of 20 static slides fired at 20 second intervals.

We accomplished by the following:
giving presenters an intuitive UI to upload files and rearrange presentations;
giving organizers simple but powerful control of event timelines, edit them on-the-fly, and have live control over media output.

__Some code highlights__

Wesley: The file upload, conversions, saving to Amazon S3 route:

https://github.com/WesleyDRobinson/jennifer/blob/develop/server/app/routes/upload/index.js
