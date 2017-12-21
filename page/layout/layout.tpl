{%block name="_config"%}{%/block%}
<!DOCTYPE html>
<!--STATUS OK-->
{%html framework="vue-audio-video:static/lib/mod.js" mode="noscript" fid="fis3" sampleRate="0.01"%}
{%head%}
<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
<meta charset="utf-8"/>
<meta name="referrer" content="always"/>
{%*移动端适配*%}
{%require name="vue-audio-video:static/js/pi-flexible.js"%}
<title>{%block name="title"%}vue-audio-video{%/block%}</title>
{%block name="meta-plus"%}{%/block%}
{%block name="css-base"%}
{%/block%}
{%block name="js-base"%}
{%/block%}
{%block name="css-plus"%}{%/block%}
{%block name="context-base"%}
{%/block%}
{%block name="context"%}{%/block%}
{%/head%}
{%block name="afterhead"%}{%/block%}

{%body%}
    <div class="wrapper">
        {%block name="body"%}{%/block%}
    </div>
{%/body%}
{%block name="afterbody"%}{%/block%}
{%/html%}