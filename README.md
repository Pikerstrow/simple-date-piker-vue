<h2>Description</h2>
<p>
This is very simple “Date Piker” component created on Vue, which has no other dependencies excepts of Vue :)
</p>
<p>
Component support four languages (English, Deutsch, Українська, Русский) and four date formats (“dd-mm-YYYY”, "YYYY-mm-dd", “dd/mm/YYYY”, “mm/dd/YYYY”). Using Options object, we can also set current date as default value.
<br/>
<b>Note:</b> Despite of four different date formats which are supported by the component, for passing date to 'back-end' all date formats converts into ISO format ('YYYY-mm-dd'), which can be used in SQL queries without restrictions. 
</p>

<h2>Screen Shots</h2>
<img src="https://user-images.githubusercontent.com/39648888/56077520-d2615980-5de5-11e9-9f92-a45f84f9a89d.png">
<p>
<b>Note:</b> highlighted date on the screenshot is the current date.
</p>

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
            <td>Русский</td>
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
            <td rowspan="4">'dateFormat'</td>
            <td>“dd-mm-YYYY”</td>
        </tr>
        <tr>
            <td>“YYYY-mm-dd”</td>
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

<p>By default, component uses English language and “YYYY-mm-dd” date format.</p>

<h2>Usage</h2>

<p>After installation, all you need is import DatePiker component, using the next syntax:</p>
<pre>import DatePiker from "simple-date-piker-vue"</pre>

<b>a) example without options (default ones)</b>
<p><img src="https://user-images.githubusercontent.com/39648888/55304101-865ffd80-5452-11e9-94cd-9eda1ebc495c.png"></p>

<b>a) example with options</b>
<p><img src="https://user-images.githubusercontent.com/39648888/55304102-865ffd80-5452-11e9-8e73-2745f5627b1d.png"></p>


<h2>Validation UI</h2>
<p>
Another feature of Component is supporting of UI for the failed validation (with bootstrap 4 'invalid-feedback' and 'is-invalid' styles). All you need is to pass error property (with the error message) to the component (see below on the picture).
</p>
<p>
<img src="https://user-images.githubusercontent.com/39648888/56077699-dd1cee00-5de7-11e9-8355-199a7fe16304.png">
</p>