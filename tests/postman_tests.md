1) POST /resume/save - happy path
   - body: schemas/resume_schema.json
   - expect: 201, { resume_id, message: "saved" }
   - DB: resumes row + personal_info + child rows + resume_versions row

2) GET /resume/load/<resume_id>
   - expect: 200 + full JSON matching saved data

3) PUT /resume/update/<resume_id>
   - change a field, send updated JSON
   - expect: 200, resume_versions should have new version

4) DELETE /resume/delete/<resume_id>
   - expect: 200, child rows removed

5) GET /resume/templates
   - expect: 200 + static template list
