<h2>Description</h2>
<p>
This is very simple “Date Piker” component created on Vue, which has no other dependencies excepts of Vue :)
<br/>
Component support four languages (English, Deutsch, Українська, Русский) and three date formats (“dd-mm-YYYY”, “dd/mm/YYYY”, “mm/dd/YYYY”). Using Options object, we can also set current date as default value.
</p>

<h2>Screen Shots</h2>
<img src="https://github.com/Pikerstrow/simple-date-piker-vue/blob/master/src/images/date-piker-screen-shot.png">

<h2>Demo</h2>
<p>Live demo - <a href="http://date-piker-demo.web-ol-mi.pp.ua/">http://date-piker-demo.web-ol-mi.pp.ua/</a></p>

<h2>Installation</h2>
<p><pre>$npm install simple-date-piker-vue –save</pre></p>

<h2>Options and props</h2>
<p>Options object (example below) has to be passed to the component in common way (using v-bind)</p>

<h4>Supported languages</h4>
<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Value</th>
            <th>Language</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="4">'locale'</td>
            <td>“EN-en”</td>
            <td>English</td>
        </tr>
        <tr>            
            <td>“DE-de”</td>
            <td>Deutsch</td>
        </tr>
        <tr>
            <td>“UK-ua”</td>
            <td>Українська</td>
        </tr>
        <tr>
            <td>“RU-ru”</td>
            <td>Російська</td>
        </tr>
    </tbody>
</table>

<h4>Supported date formats</h4>
<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="3">'dateFormat'</td>
            <td>“dd-mm-YYYY”</td>
        </tr>
        <tr>                        
            <td>“dd/mm/YYYY”</td>
        </tr>
        <tr>
            <td>“mm/dd/YYYY”</td>
        </tr>
    </tbody>
</table>

<h4>Supported default value (current date)</h4>
<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="2">'useCurrentDate'</td>
            <td>true</td>
        </tr>
        <tr>                        
            <td>false</td>
        </tr>        
    </tbody>
</table>

<h4>Example of Options object:</h4>
<pre>
    options: {
        useCurrentDate: true,
        locale: "Uk-ua",
        dateFormat: "dd-mm-YYYY"
    }
</pre>

<p>By default, component uses English language and “dd/mm/YYYY” date format.</p>

<h2>Usage</h2>
<b>a) without options (default ones)</b>
<pre>
    import DatePiker from "simple-date-piker-vue";

    export default {
        name: "app",
        data() {
            return {
                date: ""
            };
        },
        components: {
            "date-piker": DatePiker
        }
    }
</pre>

<p><img src="https://github.com/Pikerstrow/simple-date-piker-vue/blob/master/src/images/date-piker-no-options.png"></p>

<b>a) with options</b>
<pre>
    import DatePiker from './components/DatePiker.vue'

    export default {
        name: 'app',
        data() {
            return {
                date: '',
                options: {
                    useCurrentDate: true,
                    locale: "Uk-ua",
                    dateFormat: "dd-mm-YYYY"
                }
            }
        },
        components: {
            'date-piker': DatePiker
        }
    }
</pre>

<p><img src="https://github.com/Pikerstrow/simple-date-piker-vue/blob/master/src/images/date-piker-options.png"></p>