contents = File.read('happy.txt')


data = [];
contents.split("\n").each do |row|
  data.push([])
  row.split(',').each_with_index do |bin, idx|
    data[idx].push(bin.to_f)
  end
end
