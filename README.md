__We built a tool for uploading and managing presentation media.__

Our recorded demo: https://vimeo.com/129610295

This version is specifically aimed at PechaKucha events where presenters agree to presentation constraints of 20 static slides fired at 20 second intervals.

We accomplished by the following:
giving presenters an intuitive UI to upload files and rearrange presentations;
giving organizers control of their event timeline, the ability to edit it on-the-fly, and have live control over media output.

__Some code highlights__

Wesley: The file upload, conversions, saving to Amazon S3 route:

https://github.com/WesleyDRobinson/PresOrganizer/blob/develop/server/app/routes/upload/index.js
