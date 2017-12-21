<div class="app-mount-dom">
    <app v-cloak></app>
</div>

{%script%}
    require.async('vue-audio-video:widget/app/app.es6.js', function(app) {
        app.init();
    });
{%/script%}
