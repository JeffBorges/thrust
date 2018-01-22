import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;

import br.com.softbox.thrust.main.Main;

@TestInstance(Lifecycle.PER_CLASS)
public class RequireCacheTest extends BaseTest {
	@Test
	public void run() throws Exception {
		Main.main(new String[] {"src/test/resources/RequireCache/index.js"});
		assertEquals("bitCode loaded!\n", outContent.toString());
	}
}
