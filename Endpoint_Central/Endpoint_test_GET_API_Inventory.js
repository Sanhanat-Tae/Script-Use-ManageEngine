/*Test on Postman
Test GET Inventory form endpoint central
GET https://localhost:8383/api/1.4/inventory/scancomputers
or
GET http://localhost:8020/api/1.4/inventory/scancomputers

Set Headers
|------------------------------------------|
|       key        |        value          |
|------------------------------------------|
| Authorization    |   API-KEY             |
| Content-Type     |   application/json    |
|------------------------------------------|
*/
var json = pm.response.json();
var computers = json.message_response.scancomputers;

var filtered = computers.map(function(c) {
    return {
        fqdn_name: c.fqdn_name || "-",
        agent_logged_on_users: c.agent_logged_on_users || "-",
        servicetag: c.servicetag || "-",
        os_name: c.os_name || "-"
    };
});

// Template HTML สำหรับแสดงเป็นตาราง
var template = `
<table border="1" cellpadding="6" style="border-collapse:collapse; font-family:Arial; font-size:13px;">
  <thead style="background:#0078D7; color:white;">
    <tr>
      <th>FQDN Name</th>
      <th>Logged On User</th>
      <th>Service Tag (S/N)</th>
      <th>OS</th>
    </tr>
  </thead>
  <tbody>
    {{#each data}}
    <tr>
      <td>{{fqdn_name}}</td>
      <td>{{agent_logged_on_users}}</td>
      <td>{{servicetag}}</td>
      <td>{{os_name}}</td>
    </tr>
    {{/each}}
  </tbody>
</table>
<p style="font-size:11px; color:gray;">Total: {{data.length}} computers</p>

`;

pm.visualizer.set(template, { data: filtered });