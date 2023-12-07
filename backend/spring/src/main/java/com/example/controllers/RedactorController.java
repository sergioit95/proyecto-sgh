import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.models.Articulo;
import com.example.models.Redactor;
import com.example.services.ArticuloService;
import com.example.services.RedactorService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/redactores")
public class RedactorController {

    @Autowired
    private RedactorService redactorService;

    @Autowired
    private ArticuloService articuloService;

    @GetMapping
    public List<Redactor> obtenerTodosLosRedactores() {
        return redactorService.obtenerTodosLosRedactores();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Redactor> obtenerRedactorPorId(@PathVariable Long id) {
        Optional<Redactor> redactor = redactorService.obtenerRedactorPorId(id);
        return redactor.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> crearRedactor(@RequestBody Redactor redactor) {
        redactorService.crearRedactor(redactor);
        return ResponseEntity.status(HttpStatus.CREATED).body("Redactor creado exitosamente");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> modificarRedactor(@PathVariable Long id, @RequestBody Redactor redactor) {
        redactorService.modificarRedactor(id, redactor);
        return ResponseEntity.ok("Información del redactor modificada exitosamente");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarRedactor(@PathVariable Long id) {
        redactorService.eliminarRedactor(id);
        return ResponseEntity.ok("Redactor eliminado exitosamente");
    }

    @PostMapping("/{idRedactor}/articulos")
    public ResponseEntity<String> crearArticulo(@PathVariable Long idRedactor, @RequestBody Articulo articulo) {
        articuloService.crearArticulo(idRedactor, articulo);
        return ResponseEntity.status(HttpStatus.CREATED).body("Artículo creado exitosamente");
    }

    @PutMapping("/{idRedactor}/articulos/{idArticulo}")
    public ResponseEntity<String> modificarArticulo(
            @PathVariable Long idRedactor, @PathVariable Long idArticulo, @RequestBody Articulo articulo) {
        try {
            articuloService.modificarArticulo(idRedactor, idArticulo, articulo);
            return ResponseEntity.ok("Artículo modificado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al modificar el artículo");
        }
    }

    @DeleteMapping("/{idRedactor}/articulos/{idArticulo}")
    public ResponseEntity<String> eliminarArticulo(@PathVariable Long idRedactor, @PathVariable Long idArticulo) {
        try {
            articuloService.eliminarArticulo(idRedactor, idArticulo);
            return ResponseEntity.ok("Artículo eliminado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el artículo");
        }
    }
}
