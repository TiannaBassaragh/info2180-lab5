<?php
$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

$country = $_GET['country'] ?? '';  // If there's no country specified just return them all
$lookup = $_GET['lookup'] ?? '';

if ($lookup==='cities') {
  $stmt = $conn->query("
          SELECT cities.name AS city, cities.district, cities.population
          FROM cities
          JOIN countries ON cities.country_code = countries.code
          WHERE countries.name LIKE '%$country%'
        ");
} else {
  $stmt = $conn->query("SELECT * FROM countries WHERE name LIKE '%$country%'");
}

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>

<?php 
if ($lookup === 'cities'):
  if ($results): 
?>
    <table>
      <thead>
        <tr>
          <th>City Name</th>
          <th>District</th>
          <th>Population</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($results as $row): ?>
          <tr>
            <td><?= $row['city']; ?></td>
            <td><?= $row['district']; ?></td>
            <td><?= $row['population']; ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php else: ?>
    <p>No cities found.</p>
  <?php endif; ?>

<?php 
else:
  if ($results):
?>
    <table>
      <thead>
        <tr>
          <th>Country Name</th>
          <th>Continent</th>
          <th>Independence</th>
          <th>Head of State</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($results as $row): ?>
          <tr>
            <td><?= $row['name']; ?></td>
            <td><?= $row['continent']; ?></td>
            <td><?= $row['independence_year'] ?: ''; ?></td>
            <td><?= $row['head_of_state'] ?: ''; ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  <?php else: ?>
    <p>No results found.</p>
  <?php endif; ?>
<?php endif; ?>